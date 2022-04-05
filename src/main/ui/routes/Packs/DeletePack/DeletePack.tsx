import React from 'react';
import s from './DeletePack.module.css';
import Modal from "../../../common/Modal/Modal";
import {useDispatch} from "react-redux";
import {deletePackTC} from "../../../../bll/packsreducer";

type PropsType = {
    setModalDelete: (modal: string) => void
    modalDelete: string
}

const DeletePack = (props: PropsType) => {

    const dispatch = useDispatch()

    return (
        <Modal setModal={props.setModalDelete}>
            <div className={s.deletePack}>
                <div className={s.title}>
                    <span>Delete Pack</span>
                    <button onClick={()=> {props.setModalDelete('')}}>X</button>
                </div>
                <p>Do you really want to remove <span >this Pack?</span> All cards will be excluded from this course.</p>
                <button className={s.deletePackBtn} onClick={()=> dispatch(deletePackTC(props.modalDelete))}>Delete</button>
            </div>
        </Modal>
    );
};

export default DeletePack;
