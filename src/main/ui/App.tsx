import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Profile from "./routes/Profile/Profile";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import RecoverPassword from "./routes/RecoverPassword/RecoverPassword";
import NewPassword from "./routes/NewPassword/NewPassword";
import PageNotFound from "./routes/404/PageNotFound";

const App = () => {

    return (
        <div className="App">
            <>
                <Routes>
                    <Route path='profile' element={<Profile/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='register' element={<Register/>}/>
                    <Route path='recovery-password' element={<RecoverPassword/>}/>
                    <Route path='new-password' element={<NewPassword/>}/>
                    <Route path='404' element={<PageNotFound/>}/>
                </Routes>
            </>
        </div>
    );
}

export default App;
