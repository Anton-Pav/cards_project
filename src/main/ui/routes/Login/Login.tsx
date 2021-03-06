import {useFormik} from 'formik';
import React from 'react';
import s from './Login.module.scss'
import {LoginPostType} from "../../../dal/loginAPI";
import {useDispatch, useSelector} from "react-redux";
import {LoadingType, loginTC} from "../../../bll/loginReducer";
import {AppRootType} from "../../../bll/store";
import {Navigate} from "react-router-dom";

const Login = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootType, LoadingType>(state => state.login.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: Partial<LoginPostType> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Пароль обязателен'
            } else if (values.password.length < 3) {
                errors.password = 'Пароль должен быть больше 3-х символов'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    })

    if (isLoggedIn === 'success') {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={s.loginBlock}>
            <div className={s.block1}>
                <h2>Sign In</h2>
            </div>
            <div className={s.block2}>
                <form className={s.form} onSubmit={formik.handleSubmit}>
                    <input className={s.email} id="email"
                           name="email"
                           type="email"
                           onChange={formik.handleChange}
                           value={formik.values.email}/>
                    {formik.touched.email && formik.errors.email &&
                        <div style={{color: 'red'}}>{formik.errors.email}</div>}
                    <input className={s.password}
                           id="password"
                           name="password"
                           type="password"
                           onChange={formik.handleChange}
                           value={formik.values.password}/>
                    {formik.touched.password && formik.errors.password &&
                        <div style={{color: 'red'}}>{formik.errors.password}</div>}
                    <div className={s.btn}>
                        <button className={s.buttonLogin} type={'submit'}>Login</button>
                        <a className={s.forgotPassword} href={'/recovery-password'}>Forgot Password</a>
                    </div>
                </form>
            </div>
            <div className={s.block3}>
                <span>Don't have an account?</span>
                <a className={s.signUp} href={'/register'}>Sign Up</a>
            </div>
        </div>
    );
};

export default Login;