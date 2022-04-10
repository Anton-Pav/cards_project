import React, {useState} from 'react';
import s from './TableCard.module.scss';
import {Rating} from "../../../routes/Cards/Rating/Rating";
import {useSelector} from "react-redux";
import {AppRootType} from "../../../../bll/store";
import {CardsType} from "../../../../bll/cardsReducer";
import AddCard from "../../../routes/Cards/AddCard/AddCard";
import DeleteCard from "../../../routes/Cards/DeleteCard/DeleteCard";
import {useParams} from "react-router-dom";

function TableCard() {

    const {id} = useParams<string>()

    const myId = useSelector<AppRootType, string| null>(state => state.login.id)
    const cards = useSelector<AppRootType, CardsType[]>(state => state.cards.cards)

    const [modal, setModal] = useState('')
    const [modalDelete, setModalDelete] = useState(false)
    const [card, setCard] = useState<CardsType>()

    return (
        <div className={s.table}>
            {modal && modal !== 'add' && <AddCard setModal={setModal} modal={modal} packId={id? id:''} card={card}/>}
            {modalDelete && card && <DeleteCard setModalDelete={setModalDelete} card={card}/>}
            <table>
                <thead>
                <tr>
                    <th >Question</th>
                    <th >Answer</th>
                    <th style={{width: '120px'}}>Last Updated</th>
                    <th style={{width: '120px'}}>Grade</th>
                    <th style={{width: '120px'}}>Actions</th>
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
                            <td style={{width: '120px'}}>{new Date(Date.parse(m.updated)).toLocaleDateString()}</td>
                            <td style={{width: '120px'}}><Rating value={m.grade}/></td>
                            <td style={{width: '120px'}}>
                                { myId === m.user_id?
                                    <>
                                        <button className={s.delete} onClick={() => {
                                            setModalDelete(true)
                                            setCard(m)
                                        }
                                        }>Delete</button>
                                        <button className={s.edit} onClick={()=> {
                                            setModal('edit')
                                            setCard(m)
                                        }
                                        }>Edit</button>
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
    );
}

export default TableCard;