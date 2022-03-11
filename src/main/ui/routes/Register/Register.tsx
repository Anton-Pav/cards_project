import React, {useState} from 'react';
import s from "../Register/Register.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../../bll/store";
import {useFormik} from "formik";
import {registerAPI, RegisterPostType} from "../../../dal/loginAPI";
import {loginTC} from "../../../bll/loginReducer";
import {Navigate, useNavigate} from "react-router-dom";

const Register = () => {

    // const dispatch = useDispatch();

    const [isValid, setIsValid] = useState(false)
    const [error, setError] = useState<string| null>(null)

    const navigate = useNavigate()
    console.log(error)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors: Partial<RegisterPostType> = {};
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
            registerAPI.register(values).then(res => {
                setIsValid(true)
                 console.log()
            })
                .catch(e=> {
                    const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
                    setError(error)
                })
        },
    })

    // const login = () => {
    //     dispatch(loginTC())
    // }
    if (isValid) {
        return  <Navigate to={'/login'}/>
    }

    return (
        <div className={s.registerBlock}>
            <div className={s.block1}>
                <h3>Sign Up</h3>
            </div>
            <div className={s.block2}>
                <form className={s.form} onSubmit={formik.handleSubmit}>
                    <input className={s.email} id="email"
                           name="email"
                           type="email"
                           onChange={formik.handleChange}
                           value={formik.values.email}/>
                    {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                    <input className={s.password}
                           id="password"
                           name="password"
                           type="password"
                           onChange={formik.handleChange}
                           value={formik.values.password}/>
                    {formik.touched.password && formik.errors.password &&
                    <div style={{color: 'red'}}>{formik.errors.password}</div>}
                    <div className={s.buttons}>
                        <button className={s.buttonCancel} type={'button'} onClick={()=> navigate('/login')}>Cancel</button>
                        <button className={s.buttonRegister} type={'submit'}>Register</button>

                    </div>

                </form>
            </div>
            {error && <div>{error}</div>}
        </div>
    );
};

export default Register;