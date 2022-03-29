import React from 'react';
import s from './RecoveryPassword.module.css';
import {useFormik} from "formik";
import {LoginPostType} from "../../../dal/loginAPI";
import {useDispatch, useSelector} from "react-redux";
import {forgotTC} from "../../../bll/recoveryPasswordReducer";
import {AppRootType} from "../../../bll/store";
import CheckedEmail from "./CheckedEmail/CheckedEmail";

const RecoverPassword = () => {

    const error = useSelector<AppRootType, string| null>(state => state.recoveryPassword.error)
    const isValideEmail = useSelector<AppRootType, boolean>(state => state.recoveryPassword.isValidEmail)
     const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const errors: Partial<LoginPostType> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: values => {
            console.log(values)
            dispatch(forgotTC(values.email))
        },
    })

    return (
        <div className={s.recPasswordBlock}>
            {   isValideEmail? <CheckedEmail/> :
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <h2 className={s.forgotPasswordText}>Forgot your password?</h2>
                        <input placeholder={'Email'}
                               id="email"
                               name="email"
                               type="email"
                               onChange={formik.handleChange}
                               value={formik.values.email}/>
                        {formik.touched.email && formik.errors.email && <div style = {{color: 'red'}}>{formik.errors.email}</div>}
                        <p>Enter your email address and we will send you further instructions</p>
                        <button className={s.btnSend} type={'submit'}> Send Instruction</button>
                    </form>
                    <p >Did you remember your password?</p>
                    <a href={'/login'}>Try logging in</a>
                </div>
            }

        </div>
    );
};

export default RecoverPassword;