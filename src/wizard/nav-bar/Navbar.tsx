import React from "react";
import {Step} from "../Wizard";

import './nav-bar.scss'

interface State {

}

interface Props {
    steps: Step[];
    currentStep: number;
    name: string;
    onChange: Function
}



class Navbar extends React.Component<Props, State> {

    handleClick(index: number){
      this.props.onChange(index);
    };

    addClassName(step: number, currentStep: number) {
        return step === currentStep ? "active nav-item": "nav-item"
    }

    renderSteps() {
        const {steps, currentStep} = this.props;
        return steps.map(step => (
            <div
                className={this.addClassName(step.index, currentStep)}
                onClick={() => this.handleClick(step.index)}
                key={step.index}
            >
                <span className={"text"}>{step.index}</span>
            </div>
        ));
    }
    render() {
        // const {steps, currentStep} = this.props;
        return (
            <div className={"nav-bar"}>
                {this.renderSteps()}
            </div>
        );
    }

}

export default Navbar;
