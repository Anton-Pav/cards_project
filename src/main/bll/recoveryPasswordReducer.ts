import {authForgotAPI, ForgotPostType} from "../dal/loginAPI";
import {Dispatch} from "redux";


type InitialStateType = {
    error: string | null
    isValidEmail: boolean
}

const initialState: InitialStateType = {
    error: null,
    isValidEmail: false
}

export const recoveryPasswordReducer = (store = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "FORGOT/ERROR": {
            return {...store, error: action.payload.error}
        }
        case "CHECK-EMAIL": {
            return {...store, isValidEmail: action.payload.isValidEmail}
        }
        default:
            return store
    }
}


type ActionType = forgotErrorACType | checkValidEmailACType

type forgotErrorACType = ReturnType<typeof forgotErrorAC>
type checkValidEmailACType = ReturnType<typeof checkValidEmailAC>

const forgotErrorAC = (error: string) => ({type: "FORGOT/ERROR", payload: {error}} as const)
const checkValidEmailAC = (isValidEmail: boolean) => ({type: "CHECK-EMAIL", payload: {isValidEmail}} as const)

export const forgotTC = (email: string) => (dispatch: Dispatch) => {
    const message = `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/new-password/$token$'>
link</a>
</div>`
    authForgotAPI.forgot({email, message}).then(res => {
        console.log(res.data.info)
        dispatch(checkValidEmailAC(true))
    })
        .catch(e => dispatch(forgotErrorAC(e)))

}