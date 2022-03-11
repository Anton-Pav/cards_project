import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/auth',
    withCredentials: true,
})

export const loginAPI = {
    login(data : LoginPostType) {
        return instance.post<LoginPostType, AxiosResponse<LoginResponseType>>('/login', data)
    }
}

export const registerAPI = {
    register(data: RegisterPostType) {
        return instance.post<RegisterPostType, AxiosResponse<RegisterResponseType>>('/register', data)
    }
}
export const authMeAPI = {
    me() {
        return instance.post<AxiosResponse<LoginResponseType>>('/me')
    }
}
export type LoginPostType = {
    email: string
    password: string
    rememberMe: boolean
}
export type RegisterPostType = {
    email: string
    password: string
}


type LoginResponseType = {

    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number


    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean

    error?: string
}

export type RegisterResponseType = {
    error?: string
}
