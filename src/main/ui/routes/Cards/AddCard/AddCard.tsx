import React, {useState} from 'react';
import Modal from "../../../common/Modal/Modal";
import {useDispatch} from "react-redux";
import s from './AddCard.module.css'
import {addCardsTC} from "../../../../bll/cardsReducer";
import modal from "../../../common/Modal/Modal";

export type PropsType = {
    setModal: (modal: string) => void
    modal: string
}
const AddCard = (props: PropsType) => {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const dispatch = useDispatch()
    return (
        <Modal setModal={props.setModal}>
            <div className={s.addCardBlock} onClick={(e) => e.stopPropagation()}>
                <h2>Card Info</h2>
                <div className={s.cardInput}>
                    <span>Question</span>
                    <input value={question} onChange={event => setQuestion(event.currentTarget.value)}/>
                    <span>Answer</span>
                    <input value={answer} onChange={event => setAnswer(event.currentTarget.value)}/>
                </div>
                <div className={s.cardBtns}>
                    <button onClick={()=> props.setModal('')}>Cancel</button>
                    <button style={{backgroundColor: 'rgb(35, 37, 94)'}} onClick={() => {if(props.modal) {
                        dispatch(addCardsTC(props.modal, question, answer))
                        props.setModal('')
                    }}}>Save</button>
                </div>
            </div>
        </Modal>
    );
};

export default AddCard;
