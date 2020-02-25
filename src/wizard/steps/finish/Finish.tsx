import React from "react";
import "./finish.scss";
import ReactJson from 'react-json-view';

import RestAPI from "../../../api/RestAPI"

interface Props {
    file: File | Blob | null
}

interface State {
    loading: boolean,
    message: string,
    success: boolean,
    interactionModel: any
}

interface Response {
    data: any;
    err: any
}



class Finish extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            loading: false,
            message: "",
            success: false,
            interactionModel: null
        };
    }

    handleClick = () => {
        debugger
        const { file } = this.props;
        if(file) {
            this.setState({
                loading: true,
            });
            this.uploadFile(file)
        }
    };

    uploadFile(file: File | Blob) {
        RestAPI.uploadSpecFile(file)
            .then(response => {
                if(response.data) {
                    setTimeout(() => {
                        this.setState({
                            success: true,
                            interactionModel: response.data,
                            loading: false
                        });
                    }, 2000);
                }
            })
            .catch(err => {
                this.setState({
                    message: "An error occurred while uploading your file. Please try again",
                    success: false,
                    loading: false
                });
            });
    }

    handleEdit = () => {

    };

    handleAdd = (e: any) => {

    };

    handleDelete = () => {

    };


    render() {
        const {loading, message, interactionModel} = this.state;
        return(
            <div className={"finish"}>
                <p>{message}</p>
                {  (!interactionModel && !loading)  &&
                    <div className={"generator"}>
                        <button className={"submit-btn"} onClick={this.handleClick}>
                            Generate Interaction Model
                        </button>
                    </div>
                }

                {
                    loading &&
                    <div className={"spinner"}>
                        <div className={"loader"}/>
                    </div>
                }

                {interactionModel &&
                    <div className={"results"}>
                        <ReactJson
                            src={interactionModel}
                            theme={'tomorrow'}
                            name={false}
                            enableClipboard={true}
                            onEdit={this.handleEdit}
                            onAdd={this.handleAdd}
                            onDelete={this.handleDelete}
                        />
                    </div>
                }

            </div>
        );
    }
}

export default Finish;
