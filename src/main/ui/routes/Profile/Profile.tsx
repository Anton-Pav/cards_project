import React, {useEffect} from 'react';
import s from './Profile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../../bll/store";
import {Navigate, useNavigate} from "react-router-dom";
import {getMyPacksTC} from "../../../bll/packsreducer";
import TablePack from "../../common/Table/TablePack/TablePack";
import Loader from "../../common/Loader/Loader";
import Table from "../../common/Table/TablePack/TablePack";
import {LoadingType, logOutTC} from "../../../bll/loginReducer";

const Profile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootType, LoadingType>(state => state.login.isLoggedIn)
    const isLoading = useSelector<AppRootType, boolean>(state => state.packs.isLoading)

    useEffect(()=> {
        if(isLoggedIn === 'success') {
            dispatch(getMyPacksTC())
        }
    }, [isLoggedIn])


    if (isLoggedIn === "failed") {
        return <Navigate to={'/login'}/>
    }

    return (

        <div className={s.profileBlock}>
            <div className={s.profileInfo}>
                <div className={s.profile}>
                    <img
                        src={'https://yt3.ggpht.com/a/AATXAJyw_o7bOgBFROmFCnapbg5WrDKHpBDVOFGJ_dU6Ig=s900-c-k-c0xffffffff-no-rj-mo'}
                        alt={'photo'}/>
                    <button className={s.editProfile} onClick={() => navigate('/edit')}
                    >Edit Profile
                    </button>
                </div>
            </div>
            <div className={s.packList}>
                <h2 className={s.title}>My packs list</h2>
                <input placeholder={'  Search...'}/>
                {!isLoading ? <Loader/> : <Table/>}
            </div>
        </div>
    );
};

export default Profile;