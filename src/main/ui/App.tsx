import React, {useEffect} from 'react';
import './App.scss';
import {Navigate, Route, Routes} from "react-router-dom";
import Profile from "./routes/Profile/Profile";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import RecoverPassword from "./routes/RecoverPassword/RecoverPassword";
import NewPassword from "./routes/NewPassword/NewPassword";
import PageNotFound from "./routes/404/PageNotFound";
import EditProfile from "./routes/Profile/EditProfile/EditProfile";
import Packs from "./routes/Packs/Packs";
import Cards from "./routes/Cards/Cards";
import {useDispatch, useSelector} from "react-redux";
import {isAuthTC, LoadingType} from "../bll/loginReducer";
import Header from "./Header/Header";
import Learn from "./routes/Learn/Learn";
import Loader from "./common/Loader/Loader";
import {AppRootType} from "../bll/store";

const App = () => {


    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootType, LoadingType>(state => state.login.isLoggedIn)
    useEffect(() => {
        dispatch(isAuthTC())
    }, [])



    return (
        <div className="App">
            <Header/>
            {isLoggedIn === 'loading' && <Loader/>}
            <>
                <Routes>
                    <Route path='profile' element={<Profile/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='register' element={<Register/>}/>
                    <Route path='recovery-password' element={<RecoverPassword/>}/>
                    <Route path='new-password/:token' element={<NewPassword/>}/>
                    <Route path='404' element={<PageNotFound/>}/>
                    <Route path='edit' element={<EditProfile/>}/>
                    <Route path='packs' element={<Packs/>}/>
                    <Route path='packs/cards/:id' element={<Cards/>}/>
                    <Route path='packs/learn-card/:id' element={<Learn/>}/>
                </Routes>
            </>
        </div>
    );
}

export default App;
