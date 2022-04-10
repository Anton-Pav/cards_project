import React, {useState} from 'react';
import Modal from "../../../common/Modal/Modal";
import {useDispatch} from "react-redux";
import s from './AddCard.module.scss'
import {addCardsTC, CardsType, updateCardTC} from "../../../../bll/cardsReducer";


export type PropsType = {
    setModal: (modal: string) => void
    modal: string
    packId: string
    card?: CardsType
}
const AddCard = (props: PropsType) => {
    console.log(props.card)
    const [question, setQuestion] = useState(props.card? props.card.question : '')
    const [answer, setAnswer] = useState(props.card? props.card.answer : '')

    const dispatch = useDispatch()
    return (
        <Modal setModal={props.setModal}>
            <div className={s.addCardBlock} onClick={(e) => e.stopPropagation()}>
                <h2 className={s.title}>Card Info</h2>
                <div className={s.cardInput}>
                    <span>Question</span>
                    <input value={question} onChange={event => setQuestion(event.currentTarget.value)}/>
                    <span>Answer</span>
                    <input value={answer} onChange={event => setAnswer(event.currentTarget.value)}/>
                </div>
                <div className={s.cardBtns}>
                    <button onClick={()=> props.setModal('')}>Cancel</button>
                    <button style={{backgroundColor: 'rgb(35, 37, 94)'}} onClick={() => {if(props.modal) {
                        if(props.modal === 'add') {
                            dispatch(addCardsTC(props.packId, question, answer))
                        } else if (props.modal !== 'add' && props.card) {
                            dispatch(updateCardTC(props.card?._id, question, answer, props.packId))
                        }
                        props.setModal('')
                    }}}>Save</button>
                </div>
            </div>
        </Modal>
    );
};

export default AddCard;
