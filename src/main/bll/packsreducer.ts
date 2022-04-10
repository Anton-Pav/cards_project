import {GetPacksResponseType, packsAPI} from "../dal/cardsAPI";
import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootType} from "./store";
import packs from "../ui/routes/Packs/Packs";

type initialStateType = {
    packs: GetPacksResponseType
    isLoading: boolean
    myPacks: boolean
    currentPage: number
}

const initialState:initialStateType = {
    packs: {} as GetPacksResponseType,
    isLoading: false,
    myPacks: false,
    currentPage: 1
}

export const packsReducer = (state = initialState, action: ActionType):initialStateType   => {
    switch (action.type) {
        case 'GET-PACKS' : {
            return {...state, packs: {...action.payload.data}, isLoading: true}
        }
        case 'SHOW-MY-PACKS': {
            return {...state, myPacks: action.payload.value}
        }
        case 'CHANGE-CURRENT-PAGE': {
            return {...state, currentPage: action.payload.value}
        }
        default:
            return state
    }
}

type ActionType = getPacksACType | showMyPacksACType | changeCurrentPageType
type getPacksACType = ReturnType<typeof getPacksAC>
type showMyPacksACType = ReturnType<typeof showMyPacksAC>
type changeCurrentPageType = ReturnType<typeof changeCurrentPage>

export const showMyPacksAC = (value:boolean) => {
    return {
        type: 'SHOW-MY-PACKS',
        payload: {value}
    } as const
}

export const changeCurrentPage = (value: number) => ({type: 'CHANGE-CURRENT-PAGE', payload: {value}} as const)

const getPacksAC = (data: GetPacksResponseType) => (
    {type: 'GET-PACKS', payload: {
    data
    }} as const)


export const getMyPacksTC = () => (dispatch: Dispatch, getState: ()=> AppRootType) => {
    const state = getState()
    packsAPI.getMyPacks(state.packs.currentPage, 20).then(res => {
        dispatch(getPacksAC(res.data))
        dispatch(showMyPacksAC(true))
    })
}
export const getAllPacksTC = (debounce: string) => (dispatch: Dispatch, getState: ()=> AppRootType) => {
    const state = getState()
    packsAPI.getAllPacks(state.packs.currentPage, 20, debounce).then(res => {
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