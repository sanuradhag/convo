import React from "react";
import Dropzone from "react-dropzone";

import json from "../../../../assets/json.svg"
import "./input-form.scss"

interface Props {
    onFileSubmit: Function
}

interface State {
    uploading: boolean;
    uploaded: boolean;
    success: boolean;
    message: string
}

class InputForm extends React.Component<Props, State> {

    constructor(props: Props){
        super(props);
        this.state = {
            uploading: false,
            uploaded: false,
            success: false,
            message: "We got your spec file !!. Lets validate your spec file."
        }
    }

    onDrop(files: File[]) {
        this.setState({
            uploading: true,
        });
        const reader = new FileReader();
        reader.onloadend = () => {
            setTimeout(() => {
                this.props.onFileSubmit(files[0], reader.result);
                this.setState({
                    success: true,
                    uploaded: true
                });
            }, 1500);
        };

        reader.readAsText(files[0]);
    }

    onDropRejected(files: File[]) {
    }



    render() {
        const { uploading, uploaded, success, message }= this.state;
        return(
            <div className={"input-form"}>
                { !uploading &&
                <div>
                    <div className={"description"}>
                    <span>Upload your Web API Specification. Which describes your application's web API
                        <br/>
                    We'll try to generate the interaction model for amazon alexa.
                        <br/>
                        After adding the file click on, <strong>VALIDATE YOUR FILE</strong></span>
                    </div>
                    <Dropzone
                        accept={".json"}
                        onDrop={files => this.onDrop(files)}
                        multiple={false}
                        onDropRejected={files => this.onDropRejected(files)}>
                        {({getRootProps, getInputProps}) => (
                            <section className={"drop-zone"}>
                                <div {...getRootProps()} className={"wrapper"}>
                                    <input {...getInputProps()} />
                                    <p className={"text"}>Drag 'n' drop your file here, or click to select files</p>
                                    <img src={json} alt={"kk"} className={"json"}/>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                }

                {
                    uploading &&
                        <div className={"messages"}>
                            {!uploaded &&
                            <div>
                                <p>Uploading!!!!</p>
                                <div className={"loader"}/>
                            </div>
                            }
                            {uploaded &&
                            <div>
                                <p className={`${success ? 'success': 'failed'}`}>{message}</p>
                            </div>
                            }
                        </div>
                }
            </div>
        );
    }
}

export default InputForm;

