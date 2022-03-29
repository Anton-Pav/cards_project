import React, {useEffect, useState} from 'react';
import s from './Profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../../bll/store";
import {isAuthTC, logOutTC} from "../../../bll/loginReducer";
import {Navigate, useNavigate} from "react-router-dom";

const Profile = () => {

    const isLoggedIn = useSelector<AppRootType, boolean>(state => state.login.isLoggedIn)
    const nameUser = useSelector<AppRootType, string | null>(state => state.login.name)
    const navigate = useNavigate()
    const dispatch = useDispatch()



    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.profileBlock}>
            <button onClick={() => dispatch(logOutTC())}>Log Out</button>
            <div className={s.profileInfo}>
                <div className={s.profile}>
                    <button className={s.editProfile} onClick={()=> navigate('/edit')}
                    >Edit Profile</button>
                </div>
                <div className={s.numCards}>

                </div>
            </div>
            <div className={s.packList}>
                <h2>My packs list</h2>
                <input/>
                <div className={s.cards}>
                    <div className={s.header}></div>
                </div>
            </div>
            <a href={'/packs'}>PacksList</a>
        </div>
    );
};

export default Profile;