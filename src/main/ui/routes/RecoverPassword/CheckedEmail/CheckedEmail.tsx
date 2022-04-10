import React from 'react';
import s from './CheckedEmail.module.scss';
import emailImg from '../../../assets/email.svg'
const CheckedEmail = () => {
    return (
        <div className={s.checkedBlock}>
            <img src={emailImg} alt={''}/>
            <h2>Check Email</h2>
            <p>We’ve sent an Email with instructions to example@mail.com</p>
        </div>
    );
};

export default CheckedEmail;