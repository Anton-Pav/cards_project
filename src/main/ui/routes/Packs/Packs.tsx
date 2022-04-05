import React, {useEffect, useState} from 'react';
import s from './Packs.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getAllPacksTC, getMyPacksTC} from "../../../bll/packsreducer";
import {AppRootType} from "../../../bll/store";
import {GetPacksResponseType} from "../../../dal/cardsAPI";
import {Navigate, useNavigate} from "react-router-dom";
import {useDebounce} from "use-debounce";
import Table from "../../common/Table/Table";
import Loader from "../../common/Loader/Loader";
import AddPack from "./AddPack/AddPack";
import DeletePack from "./DeletePack/DeletePack";

const Packs = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const packs = useSelector<AppRootType, GetPacksResponseType>(state => state.packs.packs)
    const myPacks = useSelector<AppRootType, boolean>(state => state.packs.myPacks)
    const isLoading = useSelector<AppRootType, boolean>(state => state.packs.isLoading)
    const isLoggedIn = useSelector<AppRootType, boolean>(state => state.login.isLoggedIn)
    const [value, setValue] = useState('')
    const debounce = useDebounce(value, 500)
    const [modalDelete, setModalDelete] = useState('')


    useEffect(() => {
        if (isLoggedIn) {
            if (myPacks) {
                dispatch(getMyPacksTC())
            } else {
                dispatch(getAllPacksTC(debounce[0]))
            }
        }
    }, [isLoggedIn, debounce[0]]);


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <div className={s.packsBlock}>

        {modalDelete === 'add' && <AddPack setModal={setModalDelete}/>}
        {modalDelete && modalDelete !== 'add' && <DeletePack modalDelete={modalDelete} setModalDelete={setModalDelete}/>}
        <div className={s.packsMain}>
            <button className={s.addPack} onClick={() => {setModalDelete('add')}}>
                Add pack
            </button>
            <span>Show packs cards</span>
            <button className={s.myBtn} onClick={() => dispatch(getMyPacksTC())}
                    style={myPacks ? {backgroundColor: "rgba(35, 37, 94, 0.25)"} : {}}>
                My
            </button>
            <button className={s.allBtn} onClick={() => dispatch(getAllPacksTC(''))}
                    style={!myPacks ? {backgroundColor: "rgba(35, 37, 94, 0.25)"} : {}}>
                All
            </button>

        </div>
        <div className={s.packs}>
            <h2>Pack List</h2>
            <input type={'text'} value={value} onChange={e => setValue(e.currentTarget.value)}
                   placeholder={'Search...'}/>

            {!isLoading ? <Loader/> : <Table setModalDelete={setModalDelete}/>}
            {/*{packs.cardPacks.map(m => <div>*/}
            {/*    {m.name}*/}
            {/*    <button onClick={() => {dispatch(deletePackTC(m._id))}}>Delete</button>*/}
            {/*    <button className={s.edit} onClick={() => {dispatch(updatePackTC(m._id, value))}}>Edit</button>*/}
            {/*    <button className={s.learn} onClick={()=> {*/}
            {/*        return navigate(`cards/${m._id}`, {state: {packsName: m.name}})}}>Learn</button>*/}
            {/*</div>)}*/}
        </div>
    </div>


};

export default Packs;
