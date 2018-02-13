export const TRIDENT_ARRAY = 'TRIDENT_INFO'
export const PAGE_LOCATION = 'PAGE_LOCATION'
export const VALID_USER = 'VALID_USER'
export const SELECTED_TRIDENT = 'SELECTED_TRIDENT'
export const TRIDENT_ALERTS = 'TRIDENT_ALERTS'
export const SOURCE_IPS = 'SOURCE_IPS'
export const DEST_IPS = 'DEST_IPS'
export const DASHBOARD_INFO = 'DASHBOARD_INFO'
export const CURRENT_ALERTS = 'CURRENT_ALERTS'
export const SIGNATURE_ALERTS = 'SIGNATURE_ALERTS'
export const MAP_ALERTS = 'MAP_ALERTS'
export const INFO_ALERTS = 'INFO_ALERTS'
export const IP_ARRAY = 'IP_ARRAY'

//the array of users tridents
export const tridentArray = (tridents) => ({
  type: TRIDENT_ARRAY,
  tridents
})
//the page location used for routing
export const pageLocation = (page) => ({
  type: PAGE_LOCATION,
  page
})
//all of the logged in users info
export const login = (user) => ({
  type: VALID_USER,
  user
})
//selected trident in portal
export const tridentSelected = (trident) => ({
  type: SELECTED_TRIDENT,
  trident
})
//current array of alerts
export const tridentAlerts = (alerts) => ({
  type: TRIDENT_ALERTS,
  alerts
})
//array of source ips 
export const tridentSourceIPs = (ips) => ({
  type: SOURCE_IPS,
  ips
})
//array of destination ips
export const tridentDestIPs = (ips) => ({
  type: DEST_IPS,
  ips
})
//current alerts
export const tridentCurrentAlerts = (all) => ({
  type: CURRENT_ALERTS,
  all
})
//info used for the dashboard page
export const dashboardInfo = (all) => ({
  type: DASHBOARD_INFO,
  all
})
//signature alerts 
export const tridentSignatureAlerts = (all) => ({
  type: SIGNATURE_ALERTS,
  all
})
//map alerts
export const mapAlerts = (all) => ({
  type: MAP_ALERTS,
  all
})
//stores all alerts 
export const infoAlerts = (all) => ({
  type:INFO_ALERTS,
  all
})
//array of ips
export const ips = (all) => ({
  type:IP_ARRAY,
  all
})