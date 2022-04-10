import React, {useEffect, useState} from 'react';
import s from './Packs.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getAllPacksTC, getMyPacksTC} from "../../../bll/packsreducer";
import {AppRootType} from "../../../bll/store";
import {Navigate} from "react-router-dom";
import {useDebounce} from "use-debounce";
import Table from "../../common/Table/TablePack/TablePack";
import Loader from "../../common/Loader/Loader";
import AddCardPack from "./AddPack/AddCardPack";
import {LoadingType} from "../../../bll/loginReducer";

const Packs = () => {

    const dispatch = useDispatch()

    const myPacks = useSelector<AppRootType, boolean>(state => state.packs.myPacks)
    const isLoading = useSelector<AppRootType, boolean>(state => state.packs.isLoading)
    const isLoggedIn = useSelector<AppRootType, LoadingType>(state => state.login.isLoggedIn)

    const [value, setValue] = useState('')
    const debounce = useDebounce(value, 500)

    const [modalAddPack, setModalAddPack] = useState(false)

    const currentPage = useSelector<AppRootType, number>(state => state.packs.currentPage)
    const styleBtnMyAll = {backgroundColor: "rgba(35, 37, 94, 0.4)"}

    useEffect(() => {
        if (isLoggedIn === 'success') {
            if (myPacks) {
                dispatch(getMyPacksTC())
            } else {
                dispatch(getAllPacksTC(debounce[0]))
            }
        }
    }, [isLoggedIn, debounce[0], currentPage] );


    // if (!isLoggedIn) {
    //     return <Navigate to={'/login'}/>
    // }

    return <div className={s.packsBlock}>
        {modalAddPack && <AddCardPack setModal={setModalAddPack}/>}
        <div className={s.packsMain}>
            <button className={s.addPack} onClick={() => {
                setModalAddPack(true)
            }}>
                Add pack
            </button>
            <span>Show packs cards</span>
            <button className={s.myBtn} onClick={() => dispatch(getMyPacksTC())} style={myPacks ? styleBtnMyAll : {}}>
                My
            </button>
            <button className={s.allBtn} onClick={() => dispatch(getAllPacksTC(''))}
                    style={!myPacks ? styleBtnMyAll : {}}>
                All
            </button>
        </div>
        <div className={s.packs}>
            <h2>Pack List</h2>
            <input type={'text'} value={value} onChange={e => setValue(e.currentTarget.value)}
                   placeholder={'Search...'} className={s.search}/>
            {!isLoading ? <Loader/> : <Table />}
        </div>
    </div>
};

export default Packs;
