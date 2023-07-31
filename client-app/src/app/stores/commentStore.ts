import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr"
import { makeAutoObservable, runInAction } from "mobx"
import { store } from "./store"
import { ChatComment } from "../models/comment"

export default class CommentStore {
    comments: ChatComment[] = []
    hubConnection: HubConnection | null = null

    constructor() {
        makeAutoObservable(this)
    }

    createHubConnection = (activityId: string) => {
        if (store.activityStore.selectedActivity)
        {
            this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_CHAT_URL + '?activityId=' + activityId, {
                accessTokenFactory: () => store.userStore.user?.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build()

            this.hubConnection.start().catch(error => console.log("Error in hub connection", error))
            this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
                runInAction(() => {
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt + "Z")
                    })
                    this.comments = comments
                })
            })

            this.hubConnection.on('ReceiveComment', comment => {
                runInAction(() => {
                    comment.createdAt = new Date(comment.createdAt)
                    this.comments.unshift(comment)
                })
            })
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log("Error in stopping hub connection",error))
    }

    clearComments = () => {
        this.comments = []
        this.stopHubConnection()
    }

    addComment = async (comment: any) => {
        comment.activityId = store.activityStore.selectedActivity?.id
        try {
            await this.hubConnection?.invoke('SendComment', comment)
        } catch (error) {
            console.log(error)
        }
    }
}