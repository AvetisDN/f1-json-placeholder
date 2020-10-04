import React from 'react';
import {Switch, Route} from "react-router";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Post from "./components/Post";
import NotFound from "./components/404";
import User from "./components/User";
import {NavLink} from "react-router-dom";

function App() {
  return (
    <div className="container my-1 shadow-sm py-3">
        <div className="row">
            <div className="col-auto">
                <h3>LOGO</h3>
            </div>
            <div className="col">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <NavLink to='/' exact className="nav-link">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/posts' exact className="nav-link">
                            Posts
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
        <div className="row">
            <div className="col mt-3">
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/posts' exact component={Posts}/>
                    <Route path='/posts/:id' exact component={Post}/>
                    <Route path='/users/:id' exact component={User}/>
                    <Route path='/*' component={NotFound}/>
                </Switch>
            </div>
        </div>
    </div>
  );
}

export default App;
