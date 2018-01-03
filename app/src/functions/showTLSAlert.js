import React from 'react' 
import Rows from '../components/dashboard-row'

export const showTLSAlert = (data) => {
  let sourcePort = data.source_port ? data.source_port : 'N/A'
  let destPort = data.destination_port ? data.destination_port : 'N/A'
  let city = data.geoip && data.geoip.city_name ? data.geoip.city_name : 'N/A'
  let country = data.geoip && data.geoip.country_name ? data.geoip.country_name : 'N/A'
  let postal = data.geoip && data.geoip.postal_code ? data.geoip.postal_code : 'N/A'
	let subject = data.tls.subject ? data.tls.subject : 'N/A'
  let issuer = data.tls.issuerdn ? data.tls.issuerdn : 'N/A'
  let finger = data.tls.fingerprint ? data.tls.fingerprint : 'N/A'
  let version = data.tls.version ? data.tls.version : 'N/A'
  let sni = data.tls.sni ? data.tls.sni : 'N/A'
  let displayEventType = <div className="alerts-tls-event-container">
                          <Rows titles={["City","Country","Postal"]} info={[city,country,postal]}/>
                          <Rows titles={["Version","SNI","Subject"]} info={[version,sni,subject]}/>
                          <Rows titles={["Source Port","Dest Port", " "]} info={[sourcePort,destPort," "]}/>
                          <Rows titles={["Issuer","Finger"]} info={[issuer,finger]}/>
                        </div>
		return displayEventType
}