import React, {useState} from 'react';
import s from "./TablePack.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AppRootType} from "../../../../bll/store";
import {CardsPacksType} from "../../../../dal/cardsAPI";
import EditCardPack from "../../../routes/Packs/EditPack/EditCardPack";
import DeletePack from "../../../routes/Packs/DeletePack/DeletePack";
import Pagination from "../../Pagination/Pagination";
import {changeCurrentPage} from "../../../../bll/packsreducer";


function TableModule() {

    const dispatch = useDispatch()

    const onPageChange = (page: number| string) => {
        console.log(page)
        dispatch(changeCurrentPage(+page))
    }

    const navigate = useNavigate()
    const myId = useSelector<AppRootType, string | null>(state => state.login.id)
    const packs = useSelector<AppRootType, CardsPacksType[]>(state => state.packs.packs.cardPacks)
    const currentPage = useSelector<AppRootType, number>(state => state.packs.currentPage)

    const [packId, setPackId] = useState('')
    const [modalEditPack, setModalEditPack] = useState(false)
    const [modalDeletePack, setModalDeletePack] = useState(false)

    const deletePack = (packId: string) => {
        setPackId(packId)
        setModalDeletePack(true)
    }

    const editPack = (packId: string) => {
        setPackId(packId)
        setModalEditPack(true)
    }

    return (
        <div className={s.table}>
            {modalDeletePack && <DeletePack packId={packId} setModalDeletePack={setModalDeletePack}/>}
            {modalEditPack && <EditCardPack packId={packId} setModal={setModalEditPack}/>}
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th style={{width: '60px'}}>Cards</th>
                    <th style={{width: '120px'}}>Created</th>
                    <th style={{width: '120px'}}>Last Updated</th>
                    <th>Actions</th>
                </tr>
                </thead>
            </table>
            <div className={s.tableBody}>
                <table>
                    <tbody>
                    {packs.map(m => {
                        return <tr key={m._id}>
                            <td className={s.name}
                                onClick={() => navigate(`/packs/cards/${m._id}`, {state: {packsName: m.name}})}>
                                {m.name}
                            </td>
                            <td style={{width: '60px'}}>
                                {m.cardsCount}
                            </td>
                            <td style={{width: '120px'}}>
                                {new Date(Date.parse(m.created)).toLocaleDateString()}
                            </td>
                            <td style={{width: '120px'}}>
                                {new Date(Date.parse(m.updated)).toLocaleDateString()}
                            </td>
                            <td style={{textAlign: 'left'}}>
                                {myId === m.user_id ?
                                    <>
                                        <button className={s.delete} onClick={() => deletePack(m._id)}>Delete</button>
                                        <button className={s.edit} onClick={() => editPack(m._id)}>Edit</button>
                                    </>
                                    : null
                                }
                                {!!m.cardsCount &&
                                    <button className={s.learn} onClick={() => {
                                        navigate(`learn-card/${m._id}`)
                                    }}>
                                        Learn
                                    </button>}
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
            <div className={s.tfoot}>
                <Pagination onPageChange={onPageChange} totalCount={1000} currentPage={currentPage} pageSize={20} siblingCount={2}/>
            </div>
        </div>
    );
}

export default TableModule;