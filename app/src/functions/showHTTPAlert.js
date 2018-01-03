import React from 'react'
import Rows from '../components/dashboard-row'

export const showHTTPAlert = (data) => {
  let sourcePort = data.source_port ? data.source_port : 'N/A'
  let destPort = data.destination_port ? data.destination_port : 'N/A'
  let city = data.geoip && data.geoip.city_name ? data.geoip.city_name : 'N/A'
  let country = data.geoip && data.geoip.country_name ? data.geoip.country_name : 'N/A'
  let postal = data.geoip && data.geoip.postal_code ? data.geoip.postal_code : 'N/A'
 	let hostname = data.http && data.http.hostname ? data.http.hostname : 'N/A'
  let protocol = data.http && data.http.protocol ? data.http.protocol : 'N/A'
  let method = data.http && data.http.http_method ? data.http.http_method : 'N/A'
  let url = data.http && data.http.url ? data.http.url : 'N/A'
  let agent = data.http && data.http.http_user_agent ? data.http.http_user_agent : 'N/A'
  let status = data.http && data.http.status ? data.http.status : 'N/A'
  let content = data.http && data.http.http_content_type ? data.http.http_content_type : 'N/A'
  let refer = data.http && data.http.http_refer ? data.http.http_refer : 'N/A'
  // let httpLength = data.http && data.http.length ? data.http.length : 'N/A'
  // let language = data.http && data.http.accept_language ? data.http.accept_language : 'N/A'
  let displayEventType = <div className="alerts-http event-container">
                          <Rows titles={["City","Country","Postal"]} info={[city,country,postal]}/>
                          <Rows titles={["Hostname","Protocol","Method"]} info={[hostname,protocol,method]}/>
                          <Rows titles={["Status","Content","Refer"]} info={[status,content,refer]}/>
                          <Rows titles={["Source Port","Dest Port"," "]} info={[sourcePort,destPort," "]}/>
                          <Rows titles={["URL"]} info={[url]}/>
                          <Rows titles={["Agent"]} info={[agent]}/>
                        </div>
    return displayEventType
}