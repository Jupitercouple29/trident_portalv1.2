import React from 'react' 
import Rows from '../components/dashboard-row'

export const showSIGAlert = (data) => {
	let alertRule = data.rule_type ? data.rule_type : 'N/A'
	let alertInfo = data.Signature_Info ? data.Signature_Info : 'N/A'
	let severity = data.alert && data.alert.severity ? data.alert.severity : 'N/A'
	let alertID = data.alert && data.alert.signature_id ? data.alert.signature_id : 'N/A'
	let signature = data.alert && data.alert.signature ? data.alert.signature : 'N/A'
	let action = data.alert && data.alert.action ? data.alert.action : 'N/A'
	let category = data.alert && data.alert.category ? data.alert.category : 'N/A'
	let displayEventType = <div className="alerts-alert event-container">
													<Rows titles={["Rule","Info","Severity"]} info={[alertRule,alertInfo,severity]}/>
													<Rows titles={["ID","Signature","Action"]} info={[alertID,signature,action]}/>
													<Rows titles={["Category"]} info={[category]}/>
	                   		</div>
	 return displayEventType                  
}