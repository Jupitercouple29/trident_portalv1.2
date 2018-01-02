import React from 'react' 
import Rows from '../components/dashboard-row'

export const showTLSAlert = (data) => {
	let subject = data.tls.subject ? data.tls.subject : 'N/A'
  let issuer = data.tls.issuerdn ? data.tls.issuerdn : 'N/A'
  let finger = data.tls.fingerprint ? data.tls.fingerprint : 'N/A'
  let version = data.tls.version ? data.tls.version : 'N/A'
  let sni = data.tls.sni ? data.tls.sni : 'N/A'
  let displayEventType = <div className="alerts-tls-event-container">
                          <Rows titles={["Version","SNI","Subject"]} info={[version,sni,subject]}/>
                          <Rows titles={["Issuer","Finger"]} info={[issuer,finger]}/>
                        </div>
		return displayEventType
}