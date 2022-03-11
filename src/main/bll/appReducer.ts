

type InitialStateType = {
    error: string | null
}

const initialState: InitialStateType = {
    error: null,
}

export const appReducer = (store = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR': {
            return {...store,  error: action.error}
        }
        default:
            return store

    }
}
export const setAppErrorAC = (error: string | null ) => ({type: 'APP/SET-ERROR', error} as const)



export type setAppErrorACType = ReturnType<typeof setAppErrorAC>

type ActionType = setAppErrorACType