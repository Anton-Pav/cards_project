import React from 'react';
import {Link, useLocation} from "react-router-dom";
import s from './Header.module.css'

function Header() {

    const {pathname} = useLocation()

    return (
        <div className={s.headerBlock} >
            <div className={s.link} style={pathname === '/packs'?{backgroundColor: 'rgba(35, 37, 94, 0.25)'}: {}}>
                <Link style={pathname === '/packs'?{fontSize: '18px'}: {}} to={'/packs'} >Packs</Link>
            </div>
            <div className={s.link} style={pathname === '/profile'?{backgroundColor: 'rgba(35, 37, 94, 0.25)'}: {}}>
                <Link  style={pathname === '/profile'?{fontSize: '18px'}: {}} to={'/profile'}>Profile</Link>
            </div>
        </div>
    );
}

export default Header;