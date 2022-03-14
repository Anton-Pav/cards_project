import React, {useState} from 'react';
import s from './EditProfile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../../../bll/store";
import {updateUserTC} from "../../../../bll/loginReducer";

const EditProfile = () => {
    const nameUser = useSelector<AppRootType, string >(state => state.login.name as string)
    const [updateName, setUpdateName] = useState(nameUser)
    const dispatch = useDispatch()


    return (
        <div className={s.editBlock}>
            <input value={updateName} onChange={event => setUpdateName(event.currentTarget.value)}/>
            <button onClick={()=> dispatch(updateUserTC({name: updateName}))}>save </button>
        </div>
    );
};

export default EditProfile;