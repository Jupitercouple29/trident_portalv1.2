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

export const tridentArray = (tridents) => ({
  type: TRIDENT_ARRAY,
  tridents
})

export const pageLocation = (page) => ({
  type: PAGE_LOCATION,
  page
})

export const login = (user) => ({
  type: VALID_USER,
  user
})

export const tridentSelected = (trident) => ({
  type: SELECTED_TRIDENT,
  trident
})

export const tridentAlerts = (alerts) => ({
  type: TRIDENT_ALERTS,
  alerts
})

export const tridentSourceIPs = (ips) => ({
  type: SOURCE_IPS,
  ips
})

export const tridentDestIPs = (ips) => ({
  type: DEST_IPS,
  ips
})

export const tridentCurrentAlerts = (all) => ({
  type: CURRENT_ALERTS,
  all
})

export const dashboardInfo = (all) => ({
  type: DASHBOARD_INFO,
  all
})

export const tridentSignatureAlerts = (all) => ({
  type: SIGNATURE_ALERTS,
  all
})

export const mapAlerts = (all) => ({
  type: MAP_ALERTS,
  all
})

export const infoAlerts = (all) => ({
  type:INFO_ALERTS,
  all
})

export const ips = (all) => ({
  type:IP_ARRAY,
  all
})