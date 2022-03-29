import React, {useEffect, useState} from 'react';
import s from './Packs.module.css'
import {useDispatch, useSelector} from "react-redux";
import {addPackTC, deletePackTC, getAllPacksTC, getMyPacksTC, updatePackTC} from "../../../bll/packsreducer";
import {AppRootType} from "../../../bll/store";
import {GetPacksResponseType} from "../../../dal/cardsAPI";
import {Navigate, useNavigate} from "react-router-dom";
import {useDebounce} from "use-debounce";

const Packs = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const packs = useSelector<AppRootType, GetPacksResponseType>(state => state.packs.packs)
    const myPacks = useSelector<AppRootType, boolean>(state => state.packs.myPacks)
    const isLoading = useSelector<AppRootType, boolean>(state => state.packs.isLoading)

    console.log(isLoading)

    const isLoggedIn = useSelector<AppRootType, boolean>(state => state.login.isLoggedIn)

    const [value, setValue] = useState('')

    const debounce = useDebounce(value, 500)


        useEffect(() => {
        console.log('jjjj')
        if(isLoggedIn) {
            if(myPacks) {
                dispatch(getMyPacksTC())
            } else {
                dispatch(getAllPacksTC(debounce[0]))
            }
        }
    }, [isLoggedIn, debounce[0]]);


    return !isLoading? <div>zzzz</div> : <div className={s.packsBlock}>

        <div className={s.packsMain}>
            <span>Show packs cards</span>
            <button className={s.myBtn} onClick={()=> dispatch(getMyPacksTC())}>My</button>
            <button className={s.allBtn} onClick={()=> dispatch(getAllPacksTC(''))}>All</button>

        </div>
        <div className={s.packs}>
            <h2>Pack List</h2>
            <input type={'text'} value={value} onChange={e => setValue(e.currentTarget.value)} placeholder={'Search...'}/>
            <button className={s.addPack} onClick={() => {dispatch(addPackTC(value))}}>Add new pack</button>
            {packs.cardPacks.map(m => <div>
                {m.name}
                <button onClick={() => {dispatch(deletePackTC(m._id))}}>Delete</button>
                <button className={s.edit} onClick={() => {dispatch(updatePackTC(m._id, value))}}>Edit</button>
                <button className={s.learn} onClick={()=> {
                    return navigate(`cards/${m._id}`, {state: {packsName: m.name}})}}>Learn</button>
            </div>)}
        </div>
    </div>


};

export default Packs;
