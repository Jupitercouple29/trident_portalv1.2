import React from 'react' 
import Rows from '../components/dashboard-row'

export const showSIGAlert = (data) => {
	let sourcePort = data.source_port ? data.source_port : 'N/A'
  let destPort = data.destination_port ? data.destination_port : 'N/A'
  let city = data.geoip && data.geoip.city_name ? data.geoip.city_name : 'N/A'
  let country = data.geoip && data.geoip.country_name ? data.geoip.country_name : 'N/A'
  let postal = data.geoip && data.geoip.postal_code ? data.geoip.postal_code : 'N/A'
	let alertRule = data.rule_type ? data.rule_type : 'N/A'
	let alertInfo = data.Signature_Info ? data.Signature_Info : 'N/A'
	let severity = data.alert && data.alert.severity ? data.alert.severity : 'N/A'
	let alertID = data.alert && data.alert.signature_id ? data.alert.signature_id : 'N/A'
	let signature = data.alert && data.alert.signature ? data.alert.signature : 'N/A'
	let action = data.alert && data.alert.action ? data.alert.action : 'N/A'
	let category = data.alert && data.alert.category ? data.alert.category : 'N/A'
	let displayEventType = <div className="alerts-alert event-container">
													<Rows titles={["City","Country","Postal"]} info={[city,country,postal]}/>
													<Rows titles={["Rule","Info","Severity"]} info={[alertRule,alertInfo,severity]}/>
													<Rows titles={["ID","Signature","Action"]} info={[alertID,signature,action]}/>
													<Rows titles={["Source Port","Dest Port"," "]} info={[sourcePort,destPort, " "]}/>
													<Rows titles={["Category"]} info={[category]}/>
	                   		</div>
	 return displayEventType                  
}