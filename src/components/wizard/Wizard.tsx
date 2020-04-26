import React from 'react'
import Navbar from "./nav-bar/Navbar";
import ButtonBar from "./button-bar/ButtonBar";
import InputForm from "./steps/input-form/InputForm";
import Validate from "./steps/validate/Validate";
import Edit from "./steps/edit/Edit";
import Generator from "./steps/generator/Generator";

import "./wizard.scss"
import Header from "../header/Header";
import Footer from "../footer/Footer";
import View from "./steps/view/View";

interface State {
    currentStep: number,
    valid: boolean;
    steps: Step[];
    specFile: File | null;
    specJSON: string;
    visitedSteps: number[],
    interactionModel: any
}

export interface Step {
    index: number;
    name: string;
    component: any;
}


class Wizard extends React.Component<any, State> {

    steps: Step[];
    constructor(props: any) {
        super(props);
        this.steps = [
            {
            index: 1,
            name: "Submit API Specification",
            component: <InputForm onFileSubmit={this.handleFileSubmit}/>
            },
            {
                index: 2,
                name: "Validate your file",
                component: <Validate/>
            },
            {
                index: 3,
                name: "View your file",
                component: <Edit/>
            },
            {
                index: 4,
                name: "Generate interaction model",
                component: <Generator file={null} onGenerate={this.handleGeneration}/>
            },
            {
                index: 5,
                name: "View interaction model",
                component: <View interactionModel={null}/>
            }
            ];

        this.state = {
            currentStep: 1,
            valid: true,
            steps: this.steps,
            specFile: null,
            specJSON: "",
            visitedSteps: [1],
            interactionModel: null
        }

    }

    handleFileSubmit = (file: File, json: string) => {
        this.setState({
            specFile: file,
            valid: true,
            specJSON: json
        });
        localStorage.setItem("spec", json);
    };

    handleGeneration = (interactionModel: any) => {
        this.setState({
            interactionModel
        })
    };

    handleNavigation = (step: number) => {
        const {steps, visitedSteps } = this.state;
        const component =  steps.find((st:Step) => st.index === step);

        if(component && step === 4) {
            component.component = <Generator file={this.state.specFile} onGenerate={this.handleGeneration}/>
        }

        if(component && step === 5) {
            component.component = <View interactionModel={this.state.interactionModel} />
        }

        if(step === 6) {
            this.downloadFile()
            return;
        }

        visitedSteps.push(step);
        const visited = visitedSteps;

        this.setState({
            currentStep: step,
            valid: true,
            visitedSteps: visited
        });
    };

    downloadFile(){

        const downloadUrl = "http://localhost:5000/api/v1/file-download";

        const response = {
            file: downloadUrl
        };
        window.open(response.file);
    }

    renderComponent() {
        const {steps, currentStep } = this.state;
        const component =  steps.find(step => step.index === currentStep);
        if(component) {
            return component.component;
        }
        else {
            return <div></div>
        }

    }

    render () {
        const {currentStep, valid, steps, visitedSteps} = this.state;
     return(
         <div className={"wizard"}>
            <Header/>
            <Navbar
                steps={steps}
                visitedSteps={visitedSteps}
                currentStep={currentStep}
                name={"2"}
                onChange={this.handleNavigation}
            />

             {this.renderComponent()}

            <ButtonBar
                steps={steps}
                currentStep={currentStep}
                valid={valid}
                onChange={this.handleNavigation}
            />

            <Footer/>
         </div>
     );
    }
}

export default Wizard;
