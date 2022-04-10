import React from 'react';
import {Link, useLocation} from "react-router-dom";
import s from './Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {LoadingType, logOutTC} from "../../bll/loginReducer";
import {AppRootType} from "../../bll/store";

function Header() {
    const isLoggedIn = useSelector<AppRootType, LoadingType>(state => state.login.isLoggedIn)
    const {pathname} = useLocation()
const dispatch = useDispatch()

    return (
        <>
            <div className={s.headerBlock} >
                <div className={s.link} style={pathname === '/packs'?{backgroundColor: 'rgba(35, 37, 94, 0.25)'}: {}}>
                    <Link style={pathname === '/packs'?{fontSize: '18px'}: {}} to={'/packs'} >Packs</Link>
                </div>
                <div className={s.link} style={pathname === '/profile'?{backgroundColor: 'rgba(35, 37, 94, 0.25)'}: {}}>
                    <Link  style={pathname === '/profile'?{fontSize: '18px'}: {}} to={'/profile'}>Profile</Link>
                </div>
            </div>

            {isLoggedIn === 'success' && <div className={s.logout}>
                <button onClick={() => dispatch(logOutTC())}>Log Out</button>
            </div>}
        </>   );
}

export default Header;