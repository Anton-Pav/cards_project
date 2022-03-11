import React, {useEffect} from 'react';
import s from './Profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../../bll/store";
import {isAuthTC} from "../../../bll/loginReducer";
import {Navigate, useNavigate} from "react-router-dom";
const Profile = () => {

    const isLoggedIn = useSelector<AppRootType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=> {
        dispatch(isAuthTC())
    }, [])
console.log(isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.profileBlock}>
            <div className={s.profileInfo}>
                <div className={s.profile}>

                </div>
                <div className={s.numCards}>

                </div>
            </div>
            <div className={s.packList}>
                <h2>My packs list</h2>
                <input/>
                <div className={s.cards}>
                    <div className={s.header}> </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;