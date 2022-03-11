

type InitialStateType = {

}

const initialState = {

}

export const newPasswordReducer = (store = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "": {
            return store
        }
        default:
            return store

    }
}

type ActionType = any