import { User } from "./user"

export interface Profile {
    username: string
    displayName: string
    image?: string
    bio?: string
    photos?: Photo[]
    following: boolean
    followersCount: number
    followingCount: number
    joinedEventsCount: number
    hostedEventsCount: number
    eventId?: string
    eventDate?: string
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.username
        this.displayName = user.displayName
        this.image = user.image
    }
}

export interface Photo {
    url: string
    id: string
    isMain: boolean
}

export interface UserActivity {
    id: string
    title: string
    category: string
    date: Date
}