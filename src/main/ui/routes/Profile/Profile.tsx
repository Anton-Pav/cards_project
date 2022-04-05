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
            <div className={s.profileInfo}>
                <div className={s.profile}>
                    <img  src={'https://yt3.ggpht.com/a/AATXAJyw_o7bOgBFROmFCnapbg5WrDKHpBDVOFGJ_dU6Ig=s900-c-k-c0xffffffff-no-rj-mo'} alt={'photo'}/>
                    <button className={s.editProfile} onClick={() => navigate('/edit')}
                    >Edit Profile
                    </button>
                </div>
                <div className={s.numCards}>
                    <button onClick={() => dispatch(logOutTC())}>Log Out</button>
                </div>

            </div>
            <div className={s.packList}>
                <h2>My packs list</h2>
                <input placeholder={'  Search...'}/>
                {/*<div className={s.cards}>*/}
                {/*    /!*<div className={s.header}>*!/*/}

                {/*    /!*</div>*!/*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Profile;