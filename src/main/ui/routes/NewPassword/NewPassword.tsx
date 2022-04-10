import React from 'react';
import s from './NewPassword.module.scss';
import {useFormik} from "formik";
import {LoginPostType} from "../../../dal/loginAPI";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {newPasswordTC} from "../../../bll/newPasswordReducer";
import {AppRootType} from "../../../bll/store";


const NewPassword = () => {

    const params = useParams()
    const dispatch = useDispatch()

    const isValid = useSelector<AppRootType, boolean>(state => state.newPassword.isValid)

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: (values) => {
            const errors: Partial<LoginPostType> = {};
            if (!values.password) {
                errors.password = 'Пароль обязателен'
            } else if (values.password.length < 3) {
                errors.password = 'Пароль должен быть больше 3-х символов'
            }
            return errors;
        },
        onSubmit: values => {
            console.log(values)
            dispatch(newPasswordTC({password: values.password, resetPasswordToken: params.token}))
        },
    })

    if (isValid) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={s.newPasswordBlock}>
            <h2>Create new password</h2>
            <form onSubmit={formik.handleSubmit}>
                <input placeholder={'password'}
                       id="password"
                       name="password"
                       type="password"
                       onChange={formik.handleChange}
                       value={formik.values.password}/>
                <p>Create new password and we will send you further instructions to email</p>
                <button className={s.btnNewPassword}>Create new Password</button>
            </form>
        </div>
    );
};

export default NewPassword;