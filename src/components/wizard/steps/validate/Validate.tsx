import React from "react";

import "swagger-ui-react/swagger-ui.css";
import SwaggerParser from "swagger-parser";
import {OpenAPI} from "openapi-types";

import "./validate.scss";

interface Props {

}

interface State {
   validating: boolean;
   validated: boolean;
   message: string;
   success: boolean
}

class Validate extends React.Component<Props, State> {

    constructor(props: Props){
        super(props);
        this.state = {
            validated: false,
            validating: true,
            message: "",
            success: false
        };
    }

    componentDidMount(): void {
        setTimeout(() => {
            const spec = localStorage.getItem("spec");
            this.validate(spec);
        }, 1500);
    }

    validate(spec: string|null) {
        this.setState({
            validating: true
        });
        if (spec != null) {
            const data = JSON.parse(spec);
            const specDataJSON = data as any;
            debugger
            SwaggerParser.validate(specDataJSON, (err: Error | null, api?: OpenAPI.Document) => {
                this.setState({
                    validating: false,
                    validated: true
                });
                if (err) {
                    console.error(err);
                    this.setState({
                        message: err.message,
                        success: false
                    });
                } else {
                    if (api) {
                        this.setState({
                            message: "Your API Spec document is validated. And It's successful!",
                            success: true
                        });
                        console.log("API name: %s, Version: %s", api.info.title, api.info.version);
                    }
                }
            });
        }
    }


    render() {
        const {validated, validating, message, success} = this.state;
        return(
            <div className={"validate"}>
                { validating && <div className={"spinner"}>
                    <p className={"text"}>Reading your file...</p>
                    <div className={"loader"}/>
                </div> }
                {validated && <div className={"messages"}>
                    <p className={`${success ? 'success': 'failed'}`}>{message}</p>
                </div> }
            </div>
        );
    }
}

export default Validate;
