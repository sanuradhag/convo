import React from "react";

interface Props {
    handleClick: Function;
    heading: string;
}

interface State {

}

class IntentHeader extends React.Component<Props, State>{
    render() {
        return(
            <div className={"intent-header"} onClick={() => this.props.handleClick(this.props.heading)} style={{display: "inline"}}>
                {this.props.heading}
            </div>
        );
    }
}

export default IntentHeader;
