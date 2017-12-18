import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import * as actionCreators from '../actions'
import { connect } from 'react-redux'
// import config from 'config'
// import jwt from 'jsonwebtoken'

const PRIVATE_ROOT = '/portal'
const PUBLIC_ROOT = '/login'

export const AuthRoute = ({component, ...props}) => {
  const { isPrivate } = component;
  let isAuthenticated = true;
  // let token = localStorage.getItem('jwt')
  // if(token){
  //   // let decoded = ''
  //   jwt.verify(token, config.jwt.secret, function(err, decoded){
  //     if(err){
  //       isAuthenticated = false
  //     }else{
  //       let diff = Math.abs(new Date() - new Date(decoded.date))
  //       // 14 hours = 50400000 ms
  //       if(diff < 50400000 ){
  //         if(props.validUser == null){
  //           props.login(decoded.user)
  //         }
  //         isAuthenticated = true
  //       }
  //       else{
  //         localStorage.removeItem('jwt')
  //         isAuthenticated = false
  //       }
  //     }
  //   })
  // }

  if (isAuthenticated) {
    //User is Authenticated
    return <Route { ...props } component={ component } />;
  }
  else{
    //User is not Authenticated
    return <Redirect to={ PUBLIC_ROOT } />;
  }
};

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ])
};

const mapStateToProps= (state) => ({
  validUser: state.validUser
})
export default connect(mapStateToProps, actionCreators)(AuthRoute);
