import React from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

export default class Posts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            users: [],
            filter_title: ''
        }
        // this.addPost = this.addPost.bind(this)
        this.titleFilter = this.titleFilter.bind(this)
    }
    // addPost() {
    //     let tempArray = this.state.posts
    //     tempArray.push({
    //         id: tempArray.length+1,
    //         title: Math.random().toString(36)
    //     })
    //     this.setState({
    //         posts: tempArray
    //     })
    // }
    componentDidMount() {
        this.getUserData()
    }
    getPosts() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                // console.log(response)
                this.setState({
                    posts: response.data
                })
            })
            .catch(error => {
                console.error(error)
            })
    }
    getUserData() {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                // console.log(res)
                this.setState({
                    users: res.data
                })
                this.getPosts()
            })
            .catch(err => {
                console.error(err)
            })
    }
    getUserById(userId) {
        let newArray = this.state.users.filter((user, index) => {
            return user.id === userId
        })
        return newArray[0]
    }
    titleFilter(e) {
        this.setState({
            filter_title: e.target.value
        })
    }
    render() {
        return(
            <div>
                {/*<button className='btn btn-success' onClick={this.addPost}>+</button>*/}
                <div className="form-group">
                    <label>
                        <input type='text'
                               className='form-control'
                               value={this.state.filter_title}
                               onChange={this.titleFilter}
                               placeholder='Filter by Title' />
                    </label>
                </div>
                <table className='table table-bordered table-hover table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.posts.map((post, index) => {
                            if(post.title.indexOf(this.state.filter_title) !== -1)
                            return (
                                <tr key={post.id}>
                                    <td>
                                        {post.id}
                                    </td>
                                    <td>
                                        <NavLink to={`/posts/${post.id}`}>
                                            {post.title}
                                        </NavLink>
                                    </td>
                                    <td>
                                        <NavLink to={`/users/${post.userId}`}>
                                            {this.getUserById(post.userId).username}
                                        </NavLink>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
