import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './containers/login/login';
import Portal from './containers/portal/portal';
import AuthRoute from './functions/authRoute';

export class App extends Component {
  render(){
    return(
        <Router>
          <div className="router-div">
            <Switch>
              <Route exact path="/" render={() => (
                this.props.validUser ? (
                  <Redirect to="/dashboard"/>
                ) : (
                  <Redirect to="/login"/>
                )
              )}/>
              <Route path="/login" component={Login}/>
              <AuthRoute path="/dashboard" component={Portal}/>
              <AuthRoute path="/trident" component={Portal}/>
              <AuthRoute path="/support" component={Portal}/>
              <AuthRoute path="/profile" component={Portal}/>
              <AuthRoute path="/charts" component={Portal}/>
              <AuthRoute path="/alerts" component={Portal}/>
            </Switch>
          </div>
        </Router>
    )
  }
}

const mapStateToProps = (state) => ({
    validUser: state.validUser
})

export default connect(mapStateToProps)(App);
