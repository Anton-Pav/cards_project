import React, {useState} from 'react';
import s from './AddPack.module.css';
import Modal from "../../../common/Modal/Modal";
import {addPackTC} from "../../../../bll/packsreducer";
import {useDispatch} from "react-redux";

type PropsType = {
    setModal: (modal: string) => void
}

const AddPack = (props: PropsType) => {
    const [value, setValue] = useState('')

    const dispatch = useDispatch()
    return (
        <Modal setModal={props.setModal}>
            <div className={s.addPack} onClick={(e) => e.stopPropagation()}>
                <div className={s.title}>
                    <span>Add new Pack</span>
                    <button onClick={()=> {props.setModal('')}}>X</button>
                </div>
                <div className={s.namePack}>
                    <span style={{fontSize: '10px'}}>Name pack</span>
                    <input value={value}  onChange={(e)=> setValue(e.currentTarget.value)}/>
                </div>
                <button className={s.addPackBtn} onClick={() => {
                    dispatch(addPackTC(value))
                    props.setModal('')
                }}>Save</button>
            </div>
        </Modal>
    );
};

export default AddPack;
