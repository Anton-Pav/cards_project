import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/auth',
    withCredentials: true,
})

export const loginAPI = {
    login(data: LoginPostType) {
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
        return instance.post('/me')
    },
    logOut() {
        return instance.delete('/me')
    },
    updateUser(data: UpdateUserType) {
        return instance.put<UpdateUserType, AxiosResponse<LoginResponseType>>('/me', data)
            .then(res => res.data)
    }

}

export const authForgotAPI = {
    forgot(data: ForgotPostType) {
        return axios.post<ForgotPostType, AxiosResponse<ForgotResponseType>>('https://neko-back.herokuapp.com/2.0/auth/forgot', data, {withCredentials: true})
    },
    newPassword(data: NewPasswordType) {
        return axios.post<NewPasswordType, AxiosResponse<ForgotResponseType>>('https://neko-back.herokuapp.com/2.0/auth/set-new-password', data, {withCredentials: true})
    }
}


export type ForgotPostType = {
    email: string
    from?: string
    message: string
}

export type ForgotResponseType = {
    info: string
    error: string
}

export type UpdateUserType = {
    name: string
    avatar?: string
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
export type NewPasswordType = {
    password: string
    resetPasswordToken?: string
}
