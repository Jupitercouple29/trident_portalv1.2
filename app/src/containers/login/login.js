import React, { Component } from 'react'
import { auth } from '../../functions/auth'
import * as actionCreators from '../../actions'
import { connect } from 'react-redux'
import './login.css';

/**
 * Login Component that handles the login page and all of its actions.
 * Props are passed to it using Redux.
 * @type {Object}
 */
export class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      pswd: '',
      _error:''
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }
  
  componentWillMount(){
    localStorage.removeItem('jwt')
    this.props.login(null)
  }
  onInputChange(type, event){
    let stateVal = { }
    stateVal[type] = event.target.value
    this.setState(stateVal)
  }
  onFormSubmit(event){
    event.preventDefault()
    let email = this.state.email.toLowerCase()
    let pswd = this.state.pswd
    let login = this
    auth(email, pswd).then((res)=>{
      let _error = res.data
      if(res.isValid){
        // login.setState({_error: ''})
        login.props.history.push('/dashboard')
      }else{
        login.setState({_error})
      }
    });
  }
  render(){
    const { _error, isLoading } = this.state
    return(
      <div className="login-container">
        <div className="login-body">
        <h2 className="login-title">Login to Trident Portal</h2>
          <div className="login-form-container">
            <form onSubmit={this.onFormSubmit}>
              <div className="email-container">
                <label className="login-label" htmlFor="email">Email</label>
                <input
                  placeholder="Email"
                  type="email"
                  className="input-email"
                  id="email"
                  value={this.state.email}
                  onChange={this.onInputChange.bind(this,'email')}
                />
              </div>
              <div className="pswd-container">
                <label className="login-label" htmlFor="pswd">Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  className="input-pswd"
                  id="pswd"
                  value={this.state.pass}
                  onChange={this.onInputChange.bind(this,'pswd')}
                />
              </div>
              <button className="login-submit" type="submit" disabled={isLoading}>
                Login
              </button>
              <div className="login-error-container">
                <p className="login-error">{_error !== '' ? _error : ''}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actionCreators)(Login)