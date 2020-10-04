import React from "react";
import axios from 'axios'
import {NavLink} from "react-router-dom";

export default class Post extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            userId: '',
            title: '',
            body: '',
            user: {}
        }
    }
    componentDidMount() {
        // console.log(this.props.match.params.id)
        axios.get(`https://jsonplaceholder.typicode.com/posts/${this.props.match.params.id}`)
            .then(res => {
                // console.log(res)
                this.setState({
                    id: res.data.id,
                    userId: res.data.userId,
                    title: res.data.title,
                    body: res.data.body
                }, () => {
                    document.title = this.state.title
                    this.getUserData(this.state.userId)
                })
            })
            .catch(err => {
                console.error(err)
            })
    }
    getUserData(userId) {
        axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(res => {
                // console.log(res)
                this.setState({
                    user: res.data
                })
            })
            .catch(err => {
                console.error(err)
            })
    }

    render() {
        return(
            <div>
                <h1>
                    {this.state.title}
                </h1>
                <h6>
                    by
                    &nbsp;
                    <NavLink to={`/users/${this.state.user.id}`}>
                        {this.state.user.username} {`<${this.state.user.name}>`}
                    </NavLink>
                </h6>
                <p>
                    {this.state.body}
                </p>
            </div>
        )
    }
}
