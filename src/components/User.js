import React from "react";
import axios from 'axios'
import {NavLink} from "react-router-dom";

export default class User extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            posts: []
        }
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
    getUserPosts(userId) {
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(res => {
                // console.log(res)
                this.setState({
                    posts: res.data
                })
            })
            .catch(err => {
                console.error(err)
            })
    }
    componentDidMount() {
        this.getUserData(this.props.match.params.id)
        this.getUserPosts(this.props.match.params.id)
    }

    render() {
        return(
            <div>
                <h1>{this.state.user.username}</h1>
                <h3>{this.state.user.name}</h3>
                <ul>
                    {
                        this.state.posts.map((post, index) => {
                            return (
                                <li key={post.id}>
                                    <NavLink to={`/posts/${post.id}`}>
                                        {post.title}
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
