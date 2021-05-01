import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';

import Login from './views/Login';
import Index from './views/Index';
import JobDetail from './views/JobDetail';

const cookies = new Cookies();
let loggedIn = cookies.get('loggedin') ? true : false;

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login'>
                    { loggedIn ?  <Redirect to='/' /> : <Login /> }
                </Route>
                <Route path='/job/:id'>
                    { loggedIn ?  <JobDetail /> : <Login /> }
                </Route>
                <Route path='/'>
                    { loggedIn ? <Index /> : <Redirect to='/login' /> }
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;