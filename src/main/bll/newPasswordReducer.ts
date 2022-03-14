import {authForgotAPI, NewPasswordType} from "../dal/loginAPI";
import {Dispatch} from "redux";

type InitialStateType = {
    error: string | null
    isValid: boolean
}

const initialState: InitialStateType = {
    error: null,
    isValid: false
}

export const newPasswordReducer = (store = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "NEW-PASSWORD-ERROR": {
            return {...store, error: action.payload.error}
        }
        case "SUCCESS-CHANGE-PASSWORD": {
            return {...store, isValid: action.payload.isValid}
        }
        default:
            return store

    }
}

export const newPasswordErrorAC = (error: string) => ({type: 'NEW-PASSWORD-ERROR', payload: {error}} as const)

export const isValidAC = (isValid: boolean) => ({type: 'SUCCESS-CHANGE-PASSWORD', payload: {isValid}} as const)

type newPasswordErrorACType = ReturnType<typeof newPasswordErrorAC>

type isValidACType = ReturnType<typeof isValidAC>

type ActionType = newPasswordErrorACType | isValidACType


export const newPasswordTC = (data: NewPasswordType) => (dispatch: Dispatch) => {
    authForgotAPI.newPassword(data).then(res => {
        console.log(res.data.info)
        dispatch(isValidAC(true))
    })
        .catch(e => {
            dispatch(newPasswordErrorAC(e))
        })
}
