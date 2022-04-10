import React, {useEffect, useState} from 'react';
import s from './Learn.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getCards, grades} from "../../../utils/getCard";
import {AppRootType} from "../../../bll/store";
import {CardsType, getCardsTC} from "../../../bll/cardsReducer";
import {cardsAPI} from "../../../dal/cardsAPI";
import {useNavigate, useParams} from "react-router-dom";


function Learn() {

    const navigate = useNavigate()
    const {id} = useParams()

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const cards = useSelector<AppRootType, CardsType[]>(store => store.cards.cards);
    const [value, setValue] = useState<number>(0)

    const [card, setCard] = useState<CardsType>({
        answer: 'string',
        question: 'string',
        cardsPack_id: 'string',
        grade: 0,
        shots: 0,
        user_id: 'string',
        created: 'string',
        updated: 'string',
        _id: 'string',
    });

    const dispatch = useDispatch();
    useEffect(() => {
        console.log('LearnContainer useEffect');

        if (first && id) {
            dispatch(getCardsTC(id));
            setFirst(false);
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCards(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, id, cards, first]);

    const onNext = (value: number) => {
        setIsChecked(false);
        console.log(value)
        cardsAPI.upgradeCards(value, card._id)
        if (cards.length > 0) {
            // dispatch
            setCard(getCards(cards));
        } else {

        }
    }

    return (
        <>
            <div className={s.learnBlock} onClick={(e) => e.stopPropagation()}>
                <div className={s.title}>Learn Pack Name</div>
                <div className={s.question}>{card.question}</div>
                <div>
                    <button className={s.cancelBtn} onClick={() => navigate(-1)}>Cancel</button>
                    <button className={s.showBtn} onClick={() => setIsChecked(true)}>Show answer</button>
                </div>
            </div>
            {isChecked && (
                <div className={s.answerList} onClick={e => e.stopPropagation()}>
                    <div className={s.title}>{card.answer}</div>
                    <div className={s.radio}>
                        {grades.map((g, i) => (
                            <label>
                                <input name={"grade"} type={"radio"} key={'grade-' + i} value={value}
                                       onChange={() => setValue(i + 1)}/>
                                {g}
                            </label>
                        ))}
                    </div>
                    <div>
                        <button className={s.showBtn} onClick={() => onNext(value)}>next</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Learn;