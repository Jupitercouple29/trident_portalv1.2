import React, { Component } from 'react';
import axios from 'axios';
import config from 'config';
import jwt from 'jsonwebtoken'

export const getDNSAlerts = (info) => {
  let token = localStorage.getItem('jwt')
  let decoded = jwt.verify(token, config.jwt.secret)
  let tridents = info || decoded.user.tridents
  return axios.get(config.api.URL + '/trident/alerts/dns',{
    headers: {
			Authorization: `Bearer ${token}`,
		},
    params: {
      trident: tridents
    }
  })
  .then((response) => {
    return response.data
  })
  .catch((error)=>{
    return error.response
  })
}