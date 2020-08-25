import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import AddNaver from './pages/AddNaver';

import auth from './services/auth.service';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    if (auth.isAuthenticated()) {
      return <Route {...rest} render={(props) => <Component {...props} />} />;
    }
  
    return (
      <Route
        {...rest}
        render={({ location }) => (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        )}
      />
    );
};

function routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/adicionar-naver" component={AddNaver} />
        </BrowserRouter>
    )
}

export default routes;
