import React, { Component } from 'react';
import axios from 'axios';
import config from 'config';
import jwt from 'jsonwebtoken'

export const getMapAlert = (info) => {
  let lat = info.lat
  let long = info.long
  let trident = info.trident
  let token = localStorage.getItem('jwt')
  return axios.get(config.api.URL + '/tridents/mapAlerts/alert', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      lat,
      long,
      trident
    }
  })
  .then((response) => {
    return (response.data)
  })
  .catch((error)=>{
    console.log(error)
    return error.response
  })
}