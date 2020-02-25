import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../assets/communication.svg';
import"./header.scss";

const Header  =() => {
        const history = useHistory();
        return (
            <div className={"header"}>
                <div className={"ring"} onClick={() => { history.goBack(); }}>
                    <img src={logo} className="app-logo" alt="logo" />
                </div>
                <div className={"text-wrapper"} onClick={() => { history.goBack(); }}>
                    <span className={"text"}>CONVO</span>
                </div>
            </div>
        );
};

export default Header;
