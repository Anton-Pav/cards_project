import React, {useEffect, useState} from 'react';
import s from './Cards.module.css'
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addCardsTC, CardsType, deleteCardTC, getCardsTC, updateCardTC} from "../../../bll/cardsReducer";
import {AppRootType} from "../../../bll/store";


const Cards = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootType, boolean>(state => state.login.isLoggedIn)
    const {id} = useParams()

    const cards = useSelector<AppRootType, CardsType[]>(state => state.cards.cards)
    const card = cards.map(m => <div key={m._id}>
        <span>{m.question}</span><span>{m.answer}</span>
        <button className={s.deleteCard} onClick={() => {dispatch(deleteCardTC(m._id, m.cardsPack_id) )}}>Delete</button>
        <button className={s.editCard} onClick={() => {dispatch(updateCardTC(m._id, 'uuuuu', m.cardsPack_id))}} >Edit</button>
    </div>)

    useEffect(() => {
        if (id&& isLoggedIn) {
            dispatch(getCardsTC(id))
        }
    }, [isLoggedIn])

    const [value, setValue] = useState('')

    return (
        <div className={s.cardsBlock}>
            <h2 className={s.title}>packName</h2>
            <div className={s.cards}>
            </div>
            <button  onClick={()=> {
                if(id) {
                    dispatch(addCardsTC(id))
                }
            }}>Add</button>
            {card}

        </div>
    );
};

export default Cards;
