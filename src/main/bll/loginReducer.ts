import {authMeAPI, loginAPI, LoginPostType, UpdateUserType} from "../dal/loginAPI";
import {Dispatch} from "redux";
import {setAppErrorAC} from "./appReducer";


type InitialStateType = {
    name: null | string,
    avatar?: null | string,
    isLoggedIn: boolean
}

const initialState: InitialStateType = {
    name: null,
    avatar: null,
    isLoggedIn: false
}

export const loginReducer = (store = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
        case "SET-LOGIN": {
            return {...store, ...action.payload}
        }
        case "login/SET-IS-LOGGED-IN": {
            return {...store, isLoggedIn: action.value}
        }
        case "USER-UPDATE": {
            if (store.name !== action.payload.name && store.avatar !== action.payload.avatar) {
                return {...store, name: action.payload.name, avatar: action.payload.avatar}
            } else if (store.name !== action.payload.name) {
                return {...store, name: action.payload.name}
            } else if (store.avatar !== action.payload.avatar) {
                return {...store, avatar: action.payload.avatar}
            }
            return store
        }

        default:
            return store

    }
}

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)


export const loginAC = (name: string, avatar: string | undefined) => {
    return {
        type: 'SET-LOGIN',
        payload: {
            name,
            avatar,
        }
    } as const
}
// export const isAuthAC = (isLoggedIn: boolean) => ({type: 'IS-AUTH', isLoggedIn} as const)

const updateUserAC = (name: string, avatar: string | undefined) => ({
    type: "USER-UPDATE", payload: {
        name, avatar
    }
} as const)

export const loginTC = (data: LoginPostType) => (dispatch: Dispatch) => {
    loginAPI.login(data).then(res => {
            dispatch(loginAC(res.data.name, res.data.avatar))
            dispatch(setIsLoggedInAC(true))
        }
    )
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setAppErrorAC(error))
            console.log('Error: ', {...e})
        });
}
export const isAuthTC = () => (dispatch: Dispatch) => {
    authMeAPI.me().then(res => {
        dispatch(setIsLoggedInAC(true))
    })
        .catch((e) => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setAppErrorAC(error))
            console.log('Error: ', {...e})
        })
}

export const logOutTC = () => (dispatch: Dispatch) => {
    authMeAPI.logOut().then(res => {
        dispatch(setIsLoggedInAC(false))
    })
}

export const updateUserTC = (data: UpdateUserType) => (dispatch: Dispatch) => {
    authMeAPI.updateUser(data).then(data => dispatch(updateUserAC(data.name, data.avatar)))
}
// type isAuthACType = ReturnType<typeof isAuthAC>
type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
type LoginACType = ReturnType<typeof loginAC>
type UpdateUserACType = ReturnType<typeof updateUserAC>
type ActionType = LoginACType | setIsLoggedInACType | UpdateUserACType