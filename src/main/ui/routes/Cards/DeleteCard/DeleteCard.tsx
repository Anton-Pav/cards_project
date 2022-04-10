import React from 'react';
import Modal from "../../../common/Modal/Modal";
import {useDispatch} from "react-redux";
import {CardsType, deleteCardTC} from "../../../../bll/cardsReducer";
import s from './DeleteCard.module.scss'
import {useParams} from "react-router-dom";

type PropsType = {
    setModalDelete: (modal: boolean) => void
    card: CardsType
}

const DeleteCard = (props: PropsType) => {

    const {id} = useParams()
    const dispatch = useDispatch()

    return (
        <Modal setModal={props.setModalDelete}>
            <div className={s.deleteCard}>
                <div className={s.title}>
                    <span>Delete card</span>
                    <button onClick={()=> {props.setModalDelete(false)}}>X</button>
                </div>
                <p>Do you really want to remove this card?</p>
                <button className={s.deleteCardBtn} onClick={()=>id? dispatch(deleteCardTC(props.card._id, id)): null}>Delete</button>
            </div>
        </Modal>
    );
};

export default DeleteCard;
