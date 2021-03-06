import {applyMiddleware, combineReducers, createStore} from "redux";
import {appReducer} from "./appReducer";
import {loginReducer} from "./loginReducer";
import {profileReducer} from "./profilePeducer";
import {registerReducer} from "./registerReducer";
import {newPasswordReducer} from "./newPasswordReducer";
import {recoveryPasswordReducer} from "./recoveryPasswordReducer";
import thunkMiddleware from 'redux-thunk'
import {packsReducer} from "./packsreducer";
import {cardsReducer} from "./cardsReducer";


const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    packs: packsReducer,
    profile: profileReducer,
    register: registerReducer,
    newPassword: newPasswordReducer,
    recoveryPassword: recoveryPasswordReducer,
    cards: cardsReducer,

})


export type AppRootType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

