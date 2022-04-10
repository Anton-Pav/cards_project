import React, {useState} from 'react';
import s from './EditProfile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../../../bll/store";
import {updateUserTC} from "../../../../bll/loginReducer";

const EditProfile = () => {

    const dispatch = useDispatch()

    const nameUser = useSelector<AppRootType, string >(state => state.login.name as string)
    const [newName, setNewName] = useState(nameUser)

    const updateName = (e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.currentTarget.value)

    return (
        <div className={s.editBlock}>
            <input value={newName} onChange={updateName}/>
            <button onClick={()=> dispatch(updateUserTC({name: newName}))}>save </button>
        </div>
    );
};

export default EditProfile;