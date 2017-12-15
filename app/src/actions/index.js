export const TRIDENT_INFO = 'TRIDENT_INFO'
export const PAGE_LOCATION = 'PAGE_LOCATION'
export const VALID_USER = 'VALID_USER'
export const SELECTED_TRIDENT = 'SELECTED_TRIDENT'
export const TRIDENT_ALERTS = 'TRIDENT_ALERTS'
export const SOURCE_IPS = 'SOURCE_IPS'
export const DEST_IPS = 'DEST_IPS'
export const ALL_ALERTS = 'ALL_ALERTS'
export const CURRENT_ALERTS = 'CURRENT_ALERTS'
export const DNS_ALERTS = 'DNS_ALERTS'
export const HTTP_ALERTS = 'HTTP_ALERTS'
export const SIGNATURE_ALERTS = 'SIGNATURE_ALERTS'
export const TLS_ALERTS = "TLS_ALERTS"
export const MAP_ALERTS = "MAP_ALERTS"

export const tridentInfo = (tridents) => ({
  type: TRIDENT_INFO,
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

export const tridentAllAlerts = (all) => ({
  type: ALL_ALERTS,
  all
})

export const tridentSignatureAlerts = (all) => ({
    type: SIGNATURE_ALERTS,
    all
})

export const tridentDNSAlerts = (all) => ({
    type: DNS_ALERTS,
    all
})

export const tridentHTTPAlerts = (all) => ({
    type: HTTP_ALERTS,
    all
})

export const tridentTLSAlerts = (all) => ({
    type: TLS_ALERTS,
    all
})

export const mapAlerts = (all) => ({
    type: MAP_ALERTS,
    all
})
