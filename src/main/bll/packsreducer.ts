import {GetPacksResponseType, packsAPI} from "../dal/cardsAPI";
import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootType} from "./store";
import packs from "../ui/routes/Packs/Packs";

type initialStateType = {
    packs: GetPacksResponseType
    isLoading: boolean
    myPacks: boolean
}

const initialState:initialStateType = {
    packs: {} as GetPacksResponseType,
    isLoading: false,
    myPacks: false,
}

export const packsReducer = (state = initialState, action: ActionType):initialStateType   => {
    switch (action.type) {
        case 'GET-PACKS' : {
            return {...state, packs: {...action.payload.data}, isLoading: true}
        }
        case 'SHOW-MY-PACKS': {
            return {...state, myPacks: action.payload.value}
        }
        default:
            return state
    }
}

type ActionType = getPacksACType | showMyPacksACType
type getPacksACType = ReturnType<typeof getPacksAC>
type showMyPacksACType = ReturnType<typeof showMyPacksAC>

export const showMyPacksAC = (value:boolean) => {
    return {
        type: 'SHOW-MY-PACKS',
        payload: {value}
    } as const
}

const getPacksAC = (data: GetPacksResponseType) => (
    {type: 'GET-PACKS', payload: {
    data
    }} as const)


export const getMyPacksTC = () => (dispatch: Dispatch) => {
    packsAPI.getMyPacks().then(res => {
        dispatch(getPacksAC(res.data))
        dispatch(showMyPacksAC(true))
    })
}
export const getAllPacksTC = (debounce: string) => (dispatch: Dispatch) => {
    packsAPI.getAllPacks(1, 1000, debounce).then(res => {
        dispatch(getPacksAC(res.data))
        dispatch(showMyPacksAC(false))
    })
}

export const addPackTC = (name: string) => (dispatch: ThunkDispatch<AppRootType, {}, any>) => {
    packsAPI.addPack(name).then(res => {
        dispatch(getMyPacksTC())
    })
}
export const deletePackTC = (id: string) => (dispatch: ThunkDispatch<AppRootType, {}, any>) => {
    packsAPI.deletePack(id).then(res => {
        dispatch(getMyPacksTC())
    })
}
export const updatePackTC = (id: string, name: string) => (dispatch: ThunkDispatch<AppRootType, {}, any>) => {
    packsAPI.updatePack(id, name).then(res => {
        dispatch(getMyPacksTC())
    })
}