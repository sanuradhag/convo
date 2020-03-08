import React from 'react';
import "./view.scss";
import 'react-accessible-accordion/dist/fancy-example.css';

import ConvoAccordion from "./convo-accordion/ConvoAccordion";
import IntentHeader from "./intent-header/IntentHeader";

interface Props {
    interactionModel: any
}

interface State {
    interactionModel: any
    invocationName: string;
    builtInIntents: any [],
    customIntents: any[],
    samples: any[]
}

class View extends React.Component<Props,State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            interactionModel: null,
            invocationName: "",
            builtInIntents: [],
            customIntents: [],
            samples: []
        }
    }

    componentDidMount(): void {
        const {interactionModel} = this.props;
        this.setState({
            invocationName: interactionModel.languageModel.invocationName,
            builtInIntents: interactionModel.languageModel.intents.filter((intent: any) =>  intent.name.includes("AMAZON")),
            customIntents: interactionModel.languageModel.intents.filter((intent: any) =>  !intent.name.includes("AMAZON"))
        })
    }

    renderCustomIntents() {
        const {customIntents} = this.state;
        return customIntents.map(intent => (
            <ConvoAccordion
                key={intent.name}
                heading={<IntentHeader heading={intent.name} handleClick={this.handleTitleClick}/>}
                content={this.renderIntentSlots(intent)}
            />
        ));
    }

    handleTitleClick = (name: string) => {
        this.setState({
            samples: []
        });
        const intent = this.props.interactionModel.languageModel.intents.find((i: any) => i.name === name);
        this.setState({
            samples: intent.samples
        });
    };

    renderIntentSlots(intent: any) {
        return intent.slots.map((slot: any) => (
            <div className={"intent-slot"} key={slot.name}>
                &#9899;{slot.name}
            </div>
        ));
    }

    renderBuiltInIntents() {
        const {builtInIntents} = this.state;
        return builtInIntents.map(intent => (
            <div className={"intent"} key={intent.name}>
                &#9899;{intent.name}
            </div>
        ));
    }

    renderIntents() {
        const {builtInIntents} = this.state;
        const {interactionModel} = this.props;
        return (

            <ConvoAccordion
                heading={`Intents (${interactionModel.languageModel.intents.length})`}
                content={
                    <div>
                        {this.renderCustomIntents()}
                        <br/>
                        <ConvoAccordion
                            heading={`Built-In Intents (${builtInIntents.length})`}
                            content={this.renderBuiltInIntents()}/>
                    </div>
                }/>
        );
    }

    renderSamples() {
        return this.state.samples.map((s: any) => (
            <div className={"sample"}>
                <span key={s} className={"utterance"}>{s}</span>
                <br/>
            </div>
        ))
    }

    render() {
        const {invocationName, samples} = this.state;
        return (
        <div className={"view"}>
            <div className={"title"}>
                <span className={"label"}>Invocation Name</span>
                <input
                    className={"input"}
                    value={invocationName}
                    onChange={(e) => this.setState({invocationName: e.target.value})}/>
            </div>
            <br/>
            <div className={"content"}>
                <div className={"intents-wrapper"}>
                    {this.renderIntents()}
                </div>

                <div className={"samples"}>
                    {samples.length !== 0 && <span className={"utterances-heading"}>Sample Utterances</span>}
                    {this.renderSamples()}
                </div>
            </div>
        </div>
        );
    }
}

export default View;
