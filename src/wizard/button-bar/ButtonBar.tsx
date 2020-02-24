import React from "react";
import "./button-bar.scss";
import {Step} from "../Wizard";

interface State {

}

interface Props {
    currentStep: number;
    valid: boolean;
    onChange: Function
    steps: Step[]
}

class ButtonBar extends React.Component<Props, State> {

    handlePrevClick = () => {
        const {currentStep, onChange} = this.props;
        onChange(currentStep -1);
    };

    handleNextClick = () => {
        const {currentStep, onChange} = this.props;
        onChange(currentStep + 1);
    };

    render() {
        const {currentStep, steps, valid} = this.props;
        const prevStep = steps.find(st => st.index === currentStep - 1);
        const nextStep = steps.find(st => st.index === currentStep + 1);

        const prevName = prevStep ? prevStep.name : "Previous";
        const nextName = nextStep ? nextStep.name : "Finish";

        const hidePrev = currentStep === 1;
        const hideNext = currentStep === 4;

        return(
            <div className={"button-bar"}>
                <button
                    className={`btn prev-btn ${currentStep === 1 ? 'disabled': ''}`}
                    disabled={currentStep === 1}
                    onClick={this.handlePrevClick}
                    hidden={hidePrev}
                >
                    &larr;  {prevName}
                </button>
                <button
                    className={`btn next-btn  ${!valid ? 'disabled': ''}`}
                    disabled={!valid}
                    onClick={this.handleNextClick}
                    hidden={hideNext}
                >
                    {nextName}   &rarr;
                </button>
            </div>
        );
    }
}

export default ButtonBar;
