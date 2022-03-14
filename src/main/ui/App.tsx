import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Profile from "./routes/Profile/Profile";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import RecoverPassword from "./routes/RecoverPassword/RecoverPassword";
import NewPassword from "./routes/NewPassword/NewPassword";
import PageNotFound from "./routes/404/PageNotFound";
import EditProfile from "./routes/Profile/EditProfile/EditProfile";
import {isAuthTC} from "../bll/loginReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../bll/store";

const App = () => {
    // const isLoggedIn = useSelector<AppRootType, boolean>(state => state.login.isLoggedIn)
    // // const dispatch = useDispatch()
    // // useEffect(() => {
    // //     dispatch(isAuthTC())
    // // }, [])
    //
    // if (!isLoggedIn) {
    //     return <Navigate to={'/login'}/>
    // }

    return (
        <div className="App">
            <>
                <Routes>
                    <Route path='profile' element={<Profile/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='register' element={<Register/>}/>
                    <Route path='recovery-password' element={<RecoverPassword/>}/>
                    <Route path='new-password/:token' element={<NewPassword/>}/>
                    <Route path='404' element={<PageNotFound/>}/>
                    <Route path='edit' element={<EditProfile/>}/>
                </Routes>
            </>
        </div>
    );
}

export default App;
