import React, { Component } from 'react'
import { auth } from '../../functions/auth'
import * as actionCreators from '../../actions'
import { connect } from 'react-redux'
import jwt from 'jsonwebtoken'
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
      _error:'',
      loginAttempts:1,
      timeRemaining: 0
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.logoutTimer = this.logoutTimer.bind(this)
  }
  componentWillMount(){
    localStorage.removeItem('jwt')
    this.props.login(null)
    let session = localStorage.getItem('session')
    if(session && session !== 'undefined'){
      let token = localStorage.getItem('session')
      let decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET)
      console.log(decoded.logoutDate)
      console.log(decoded.loginAttempts)
      this.setState({
        loginAttempts: decoded.loginAttempts + 1       
      }) 
    }
  }
  componentDidMount(){
    this.interval = setInterval(this.logoutTimer, 1000)
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
    let loginAttempts = this.state.loginAttempts
    console.log(loginAttempts)
    let session = localStorage.getItem('session')
    if(session && session !== 'undefined'){
      let token = localStorage.getItem('session')
      let decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET)
      loginAttempts = decoded.loginAttempts + 1
    }else loginAttempts = loginAttempts + 1
    auth(email, pswd, loginAttempts).then((res)=>{
      let _error = res.data
      if(res.isValid){
        login.props.history.push('/dashboard')
      }else{
        login.setState({
          _error,
          loginAttempts:loginAttempts,
          email:'',
          pswd: ''
        })
      }
    })
  }
  handleFocus(e){
    let target = e.target.id
    if(this.state.loginAttempts > 3){
      if(target === 'email'){
        this.setState({email:''})
      }else if(target === 'pswd'){
        this.setState({pswd:''})
      }
    } 
  }
  logoutTimer(log){
    let session = localStorage.getItem('session')
    if(session && session !== 'undefined'){
      console.log(this.state.loginAttempts)
      let token = localStorage.getItem('session')
      let decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET)
      let time = new Date(decoded.logoutDate)
      let timeLeft = new Date(time.getTime() + 3*60000)
      console.log(timeLeft - new Date())
      
      console.log('timeLeft + 2')
      if(this.state.loginAttempts > 3){
        let diff = timeLeft - new Date()
        let min = Math.floor(diff/60000)
        console.log(min)
        let sec = ((diff % 60000) / 1000).toFixed(0)
        console.log(sec)
        this.setState({_error: 'Too many attempts. Logged out for ' + min + ':' + (sec < 10 ? '0' : '') + sec })
      }
      // timeLeft.setSeconds(timeLeft.getSeconds() + 2)
      if(timeLeft <= new Date()){
        console.log('time has expired')
        this.setState({loginAttempts:1,_error:''})
        localStorage.removeItem('session')
      }
    }
  }
  render(){
    const { _error, loginAttempts } = this.state
    let disabled = loginAttempts > 3
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
                  onFocus={this.handleFocus.bind(this)}
                />
              </div>
              <div className="pswd-container">
                <label className="login-label" htmlFor="pswd">Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  className="input-pswd"
                  id="pswd"
                  value={this.state.pswd}
                  onChange={this.onInputChange.bind(this,'pswd')}
                  onFocus={this.handleFocus.bind(this)}
                />
              </div>
              <button className="login-submit" type="submit" disabled={disabled}>
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