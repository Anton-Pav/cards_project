import React from 'react';
import s from './DeletePack.module.scss';
import Modal from "../../../common/Modal/Modal";
import {useDispatch} from "react-redux";
import {deletePackTC} from "../../../../bll/packsreducer";

type PropsType = {
    setModalDeletePack: (modal: boolean) => void
    packId: string
}

const DeletePack = (props: PropsType) => {

    const dispatch = useDispatch()

    return (
        <Modal setModal={props.setModalDeletePack}>
            <div className={s.deletePack}>
                <div className={s.title}>
                    <span>Delete Pack</span>
                    <button onClick={()=> {props.setModalDeletePack(false)}}>X</button>
                </div>
                <p>Do you really want to remove this Pack? All cards will be excluded from this course.</p>
                <button className={s.deletePackBtn} onClick={()=> dispatch(deletePackTC(props.packId))}>Delete</button>
            </div>
        </Modal>
    );
};

export default DeletePack;
