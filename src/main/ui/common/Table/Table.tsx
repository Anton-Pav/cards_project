import React, {useState} from 'react';
import s from "./Table.module.css";
import {updatePackTC} from "../../../bll/packsreducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AppRootType} from "../../../bll/store";
import {GetPacksResponseType} from "../../../dal/cardsAPI";

type PropsType = {
    setModalDelete: (modalDelete: string) => void
}


function TableModule(props: PropsType) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const myId = useSelector<AppRootType, string| null>(state => state.login.id)
    const [value, setValue] = useState('')
    const packs = useSelector<AppRootType, GetPacksResponseType>(state => state.packs.packs)

    return (
        <div className={s.table}>
            <table>
                <thead>
                <tr>
                    <th >Name</th>
                    <th >Cards</th>
                    <th >Last Updated</th>
                    <th >Actions</th>
                </tr>
                </thead>
            </table>
            <div className={s.tableBody}>
                <table>
                    <tbody>
                    {packs.cardPacks.map(m=> {
                        return    <tr key={m._id}>
                            <td>{m.name}</td>
                            <td>{m.cardsCount}</td>
                            <td>{new Date(Date.parse(m.updated)).toLocaleDateString()}</td>
                            <td>
                                { myId === m.user_id?
                                    <>
                                        <button className={s.delete} onClick={() => {props.setModalDelete(m._id)}}>Delete</button>
                                        <button className={s.edit} onClick={() => {dispatch(updatePackTC(m._id, value))}}>Edit</button>
                                    </>
                                    : null
                                }
                                <button className={s.learn} onClick={()=> {
                                    return navigate(`cards/${m._id}`, {state: {packsName: m.name}})}}>Learn</button>
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

export default TableModule;