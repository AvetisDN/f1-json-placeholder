import React from "react";

export default class Home extends React.Component{
    componentDidMount() {
        document.title = "Home"
    }

    render() {
        return(
            <div>
                Homepage
            </div>
        )
    }
}
