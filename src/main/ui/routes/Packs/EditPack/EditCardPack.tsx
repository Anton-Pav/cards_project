import React, {useState} from 'react';
import Modal from "../../../common/Modal/Modal";
import s from './EditCardPack.module.scss'
import {useDispatch} from "react-redux";
import {updatePackTC} from "../../../../bll/packsreducer";

type PropsType = {
    setModal: (modal: boolean) => void
    packId: string

}

const EditCardPack = (props:PropsType) => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch();

    return (
        <Modal setModal={props.setModal}>
            <div className={s.editBlock} onClick={e => e.stopPropagation()}>
                <div className={s.title}>
                    <span>Edit pack name</span>
                    <button onClick={()=> {props.setModal(false)}}>X</button>
                </div>
                <div className={s.namePack}>
                    <span style={{fontSize: '10px'}}>Name pack</span>
                    <input value={value}  onChange={(e)=> setValue(e.currentTarget.value)}/>
                </div>
                <button className={s.addPackBtn} onClick={() => {
                    dispatch(updatePackTC(props.packId, value))
                    props.setModal(false)
                }}>Save</button>
            </div>
        </Modal>
    );
};

export default EditCardPack;
