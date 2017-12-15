import React, { Component } from 'react';
// import { auth } from '../components/auth';
// import { getTridents } from '../components/getInfo'

/**
 * Login Component that handles the login page and all of its actions.
 * Props are passed to it using Redux.
 * @type {Object}
 */

export default class Login extends Component {
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
    // if(localStorage.getItem('loggedOut')){
    //   console.log(window.location)
    //   localStorage.removeItem('loggedOut')
    //   window.location.reload()
    // }
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
    // auth(email, pswd).then((res)=>{
    //   let _error = res.data
    //   if(res.isValid){
    //     let tridents = res.data.tridents
    //     getTridents(tridents)
    //     .then(result=>{
    //       login.props.tridentAllAlerts(result.responses)
    //     })
    //     login.setState({_error: ''})
    //     login.props.history.push('/portal')
    //   }else{
    //     login.setState({_error})
    //   }
    // });
  }

  render(){
    const backgroundStyle = {
      backgroundImage:"url(img/world_satellites.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      height: "100%",
      width: "100%"
    }
    const { _error, isLoading } = this.state
    return(
      <section className="login-container" style={backgroundStyle}>
        <section className="login-body">
          <img
            className="login-trident-logo"
            src="./img/trident_logo.png"
            height="400px"
            width="300px"
          />
          <section className="login-form-container">
            <form onSubmit={this.onFormSubmit}>
              <section className="email-container">
                <label className="login-label" htmlFor="email">Email</label>
                <input
                  placeholder="email"
                  type="email"
                  className="input-email"
                  id="email"
                  value={this.state.email}
                  onChange={this.onInputChange.bind(this,'email')}
                />
              </section>
              <section className="pswd-container">
                <label className="login-label" htmlFor="pswd">Password</label>
                <input
                  placeholder="password"
                  type="password"
                  className="input-pswd"
                  id="pswd"
                  value={this.state.pass}
                  onChange={this.onInputChange.bind(this,'pswd')}
                />
              </section>
              <button className="login-submit" type="submit" disabled={isLoading}>
                Login
              </button>
              <section className="login-error-container">
                <p className="login-error">{_error != '' ? _error : ''}</p>
              </section>
            </form>
          </section>
        </section>
      </section>
    );
  }
}

