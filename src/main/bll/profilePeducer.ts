

type InitialStateType = {

}

const initialState = {

}

export const profileReducer = (store = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "": {
            return store
        }
        default:
            return store

    }
}

type ActionType = any