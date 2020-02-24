import React from "react";
import SwaggerUI from "swagger-ui-react";

import "./edit.scss";

interface Props {
}

interface State {
  data: string | null;
}

class Edit extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    componentDidMount(): void {
        const spec = localStorage.getItem("spec");
        this.setState({
            data: spec || ""
        })
    }

    render() {
        if (this.state.data) {
            const spec = JSON.parse(this.state.data) as any;
            return(
                <div className={"edit"}>
                    <SwaggerUI spec={spec}/>
                </div>
            );
        }else  {
            return <div></div>
        }
    }
}

export default Edit;
