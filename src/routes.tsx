import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import AddNaver from './pages/AddNaver';

function routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/adicionar-naver" component={AddNaver} />
        </BrowserRouter>
    )
}

export default routes;