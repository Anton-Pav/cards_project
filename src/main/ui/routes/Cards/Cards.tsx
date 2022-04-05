import React, {useEffect, useState} from 'react';
import s from './Cards.module.css'
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addCardsTC, CardsType, getCardsTC} from "../../../bll/cardsReducer";
import {AppRootType} from "../../../bll/store";
import AddCard from "./AddCard/AddCard";


const Cards = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootType, boolean>(state => state.login.isLoggedIn)
    const {id} = useParams()
    const myId = useSelector<AppRootType, string| null>(state => state.login.id)
    const cards = useSelector<AppRootType, CardsType[]>(state => state.cards.cards)
    // const card = cards.map(m => <div key={m._id}>
    //     <span>{m.question}</span><span>{m.answer}</span>
    //     <button className={s.deleteCard} onClick={() => {dispatch(deleteCardTC(m._id, m.cardsPack_id) )}}>Delete</button>
    //     <button className={s.editCard} onClick={() => {dispatch(updateCardTC(m._id, 'uuuuu', m.cardsPack_id))}} >Edit</button>
    // </div>)

    const [modal, setModal] = useState('')

    useEffect(() => {
        if (id&& isLoggedIn) {
            dispatch(getCardsTC(id))
        }
    }, [isLoggedIn])

    return (
        <div className={s.cardsBlock}>
            {modal && <AddCard setModal={setModal} modal={modal}/>}
            <span  className={s.title} onClick={()=> navigate(-1)}>{
                '🡸 Pack Name'}</span>
            <div>
                <input className={s.input} placeholder={'Search...'}/>
                <button className={s.addCard} onClick={()=> {
       if(id) {
           setModal(id)
       }
                }}>Add card</button>
            </div>
            <div className={s.table}>
                <table>
                    <thead>
                    <tr>
                        <th >Question</th>
                        <th >Answer</th>
                        <th >Last Updated</th>
                        <th >Grade</th>
                        <th >Actions</th>
                    </tr>
                    </thead>
                </table>
                <div className={s.tableBody}>
                    <table>
                        <tbody>
                        {cards.map(m=> {
                            return    <tr key={m._id}>
                                <td>{m.question}</td>
                                <td>{m.answer}</td>
                                <td>{new Date(Date.parse(m.updated)).toLocaleDateString()}</td>
                                <td>{m.grade}</td>
                                <td>
                                    { myId === m.user_id?
                                        <>
                                            {/*<button onClick={() => {props.setModalDelete(m._id)}}>Delete</button>*/}
                                            {/*<button className={s.edit} onClick={() => {dispatch(updatePackTC(m._id, value))}}>Edit</button>*/}
                                        </>
                                        : null
                                    }
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
                <div className={s.tfoot}></div>
            </div>

        </div>
    );
};

export default Cards;
