import React from "react";
import {
    Link
} from "react-router-dom";

import logo from '../assets/communication.svg';
import './landing-page.scss'
import AnimationText from "./AnimationText";

function LandingPage () {
    return (

        <div className="app">
            <header className="app-header">
                <AnimationText/>

                <div className={"ring"}>
                    <img src={logo} className="app-logo" alt="logo" />
                </div>

                <Link className={"link"} to="/wizard">
                    Let start
                </Link>

            </header>
        </div>
    );
}

export default LandingPage;
