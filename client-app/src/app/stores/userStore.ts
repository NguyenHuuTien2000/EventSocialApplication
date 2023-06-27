export default class User{
    user: User | null = null;
    constructor(){
        makeAutoObservable(this)
    } 

    get isLoggedIn(){
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.User.login(creds);
            console.log(user);
        } catch (error) {
            throw error;
        }
    }
}