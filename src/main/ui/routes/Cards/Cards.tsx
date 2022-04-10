import React, {useEffect, useState} from 'react';
import s from './Cards.module.scss'
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addCardsTC, CardsType, getCardsTC, updateCardTC} from "../../../bll/cardsReducer";
import {AppRootType} from "../../../bll/store";
import AddCard from "./AddCard/AddCard";
import {Rating} from "./Rating/Rating";
import DeletePack from "../Packs/DeletePack/DeletePack";
import DeleteCard from "./DeleteCard/DeleteCard";
import TableCard from "../../common/Table/TableCard/TableCard";
import {LoadingType} from "../../../bll/loginReducer";


const Cards = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams<{ id: string }>()

    const isLoggedIn = useSelector<AppRootType, LoadingType>(state => state.login.isLoggedIn)
    const [modal, setModal] = useState('')

    useEffect(() => {
        if (id && isLoggedIn === 'success') {
            dispatch(getCardsTC(id))
        }
    }, [isLoggedIn])

    return (
        <div className={s.cardsBlock}>
            {modal === 'add' && <AddCard setModal={setModal} modal={modal} packId={id ? id : ''}/>}
            <span className={s.title} onClick={() => navigate(-1)}>{
                '🡸 Pack Name'}</span>
            <div>
                <input className={s.input} placeholder={'Search...'}/>
                <button className={s.addCard} onClick={() => {
                    if (id) {
                        setModal('add')
                    }
                }}>Add card
                </button>
            </div>
            <TableCard/>
        </div>
    );
};

export default Cards;
