// import {
//   VALID_USER, TRIDENT_ALERTS, TRIDENT_SOURCE_IPS, PAGE_LOCATION, TRIDENT_INFO } from '../actions'
import * as actions from '../actions'

export const validUser = (state = null, action) =>{
  switch(action.type){
    case actions.VALID_USER:
      return action.user
    default:
      return state
  }
}

export const alerts = (state = [] , action) => {
  switch(action.type){
    case actions.TRIDENT_ALERTS:
      return action.alerts
    default:
      return state
  }
}

export const sourceIPs = (state = [] , action) =>{
  switch(action.type){
    case actions.SOURCE_IPS:
      return action.ips
    default:
      return state
  }
}

export const destIPs = (state = [] , action) =>{
  switch(action.type){
    case actions.DEST_IPS:
      return action.ips
    default:
      return state
  }
}

export const page = (state = null, action) =>{
  switch(action.type){
    case actions.PAGE_LOCATION:
      return action.page
    default:
      return state
  }
}

export const tridentArray = (state = null, action) => {
  switch(action.type){
    case actions.TRIDENT_ARRAY:
      return action.tridents
    default:
      return state
  }
}

export const selectedTrident = (state = null, action) => {
  switch(action.type){
    case actions.SELECTED_TRIDENT:
      return action.trident
    default:
      return state
  }
}

export const currentAlerts = (state = [], action) => {
  switch(action.type){
    case actions.CURRENT_ALERTS:
      return action.all
    default:
      return state
  }
}

export const dashboardProps = (state = [], action) => {
  switch(action.type){
    case actions.DASHBOARD_INFO:
      return action.all
    default:
      return state
  }
}

export const signatureAlerts = (state = [], action) => {
  switch(action.type){
    case actions.SIGNATURE_ALERTS:
      return action.all
    default:
      return state
  }
}

export const locationAlerts = (state = [], action) => {
  switch(action.type){
    case actions.MAP_ALERTS:
      return action.all
    default:
      return state
  }
}

export const info = (state = [], action) => {
  switch(action.type){
    case actions.INFO_ALERTS:
      return action.all
    default:
      return state
  }
}

export const ipArray = (state = [], action) => {
  switch(action.type){
    case actions.IP_ARRAY:
      return action.all
    default:
      return state
  }
}