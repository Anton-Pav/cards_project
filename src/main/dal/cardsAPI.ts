import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/cards',
    withCredentials: true,
})


export const packsAPI = {
    getMyPacks(page: number = 1, pageCount: number = 1000) {
        return instance.get('/pack', {
            params: {
                page,
                pageCount,
                user_id: '622b3d7e29bee90004696548',
            }
        })
    },
    getAllPacks(page: number = 1, pageCount: number = 1000, packName: string) {
        return instance.get('/pack', {
            params: {
                page,
                pageCount,
                packName,
            }
        })
    },
    addPack(name: string) {
        return instance.post('/pack', {cardsPack: {name: name}})
    },
    deletePack(id: string) {
        return instance.delete('/pack', {params: {id}})
    },
    updatePack(_id: string, name: string) {
        return instance.put('/pack', {cardsPack: {_id, name}})
    }
}

export const cardsAPI = {
    getCards(cardsPack_id: string) {
        return instance.get('/card', {params: {cardsPack_id, pageCount: 1000}})
    },
    addCard(cardsPack_id: string) {
        return instance.post('/card', {card: {cardsPack_id}})
    },
    deleteCard(id: string) {
        return instance.delete('/card',{params: {id}})
    },
    updateCard (_id: string, question: string) {
        return instance.put('/card', {card:{_id, question}})
    }
}


export type GetPacksResponseType = {
    cardPacks: CardsPacksType[]
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number
    // количество элементов на странице
}

export type CardsPacksType = {
        _id: string
        user_id: string
        name: string
        cardsCount: number
        created: string
        updated: string
    }
