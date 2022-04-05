import {Dispatch} from "redux";
import {cardsAPI} from "../dal/cardsAPI";
import {ThunkDispatch} from "redux-thunk";

type initialStateType = {
    cards: CardsType[]
}

export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string

}

const initialState: initialStateType = {
    cards: []
}

export const cardsReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "GET-CARDS": {
            return {...state, cards: action.payload.cards}
        }
        default:
            return state
    }
}

type ActionType = getCardsACType
type getCardsACType = ReturnType<typeof getCardsAC>


const getCardsAC = (cards: CardsType[]) => ({type: "GET-CARDS", payload: {cards}} as const)

export const getCardsTC = (id: string) => (dispatch: Dispatch) => {
    return cardsAPI.getCards(id).then(res => {
        dispatch(getCardsAC(res.data.cards))
    })
}
export const addCardsTC = (id: string, question: string, answer: string) => (dispatch: ThunkDispatch<any, any, any>) => {
    return cardsAPI.addCard(id, question, answer).then(res => {
        dispatch(getCardsTC(id))
    })
}
export const deleteCardTC = (id: string, cardsPack_id: string) => (dispatch: ThunkDispatch<any, any, any>) => {
    return cardsAPI.deleteCard(id).then(res => {
        dispatch(getCardsTC(cardsPack_id))
    })
}
export const updateCardTC = (id: string, question: string, cardsPack_id: string) => (dispatch: ThunkDispatch<any, any, any>) => {
    return cardsAPI.updateCard(id, question).then(res => {
        dispatch(getCardsTC(cardsPack_id))
    })
}