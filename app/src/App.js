// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//         <p>Hello 2</p>
//       </div>
//     );
//   }
// }

// export default App;
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
        <Router >
          <div className="router-div">
            <Switch>
              <Route exact path="/" render={() => (
                this.props.validUser ? (
                  <Redirect to="/portal"/>
                ) : (
                  <Redirect to="/login"/>
                )
              )}/>
              <Route path="/login" component={Login}/>
              <AuthRoute path="/portal" component={Portal}/>
              <AuthRoute path="/trident" component={Portal}/>
              <AuthRoute path="/admin" component={Portal}/>
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
