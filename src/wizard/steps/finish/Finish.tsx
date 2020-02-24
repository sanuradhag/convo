import React from "react";
import "./finish.scss";
import AWS from "aws-sdk";

interface Props {
    file: File | null
}

interface State {
    generating: boolean;
    generated: boolean;
    message: string,
    success: boolean
}

interface Response {
    data: any;
    err: any
}

class Finish extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            generating: false,
            generated: false,
            message: "",
            success: false
        };
    }

    handleClick = () => {
        const { file } = this.props;
        if(file) {
            // this.uploadFile(file, file.name, "api-doc").then((res: any) => {
            //     if(res.data) {
            //       console.log(res.data.Location);
            //     }
            // });
        }
    };

    uploadFile(file: File, fileName: string, logo_type: string) {
        this.setState({
            generating: true,
        });


        const albumPhotosKey = encodeURIComponent(logo_type) + "/";
        const iconKey = albumPhotosKey + fileName;

        // return new Promise(resolve => {
        //     s3.upload(
        //         {
        //             Key: iconKey,
        //             Body: file,
        //             ACL: "public-read",
        //             Bucket: "dev-test123"
        //         },
        //         (err, data) => {
        //             let res: Response = {
        //                 data: null,
        //                 err: null
        //             };
        //
        //             if (err) {
        //                 res.err = err;
        //                 this.setState({
        //                     message: "An error occurred while uploading your file. Please try again",
        //                     success: false,
        //                     generated: true
        //                 });
        //             } else {
        //                 res.data = data;
        //                 this.setState({
        //                     success: true,
        //                     generated: true,
        //                     generating: false
        //                 });
        //             }
        //             resolve(res);
        //         }
        //     );
        // });
    }


    render() {
        const {generating, generated, message, success} = this.state;
        return(
            <div className={"finish"}>
                {  !generated &&
                    <div className={"generator"}>
                        {!generating &&
                        <button className={"submit-btn"} onClick={this.handleClick}>
                            Generate Interaction Model
                        </button>
                        }

                        {
                            generating && <div className={"loader"}/>
                        }


                    </div>
                }

                {generated &&
                    <div className={"results"}></div>
                }

            </div>
        );
    }
}

export default Finish;
