import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import LandingPage from './components/landing-page/LandingPage';
import Wizard from './components/wizard/Wizard';

function App() {
  return (
    <Router>
            <Switch>
                <Route path="/wizard">
                    <Wizard />
                </Route>
                <Route path="/">
                    <LandingPage />
                </Route>
            </Switch>
    </Router>
  );
}

export default App;
