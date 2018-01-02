import React from 'react'
import Rows from '../components/dashboard-row'

export const showDNSAlert = (data) => {
	let name = data.dns && data.dns.rrname ? data.dns.rrname : 'N/A'
  let dnsData = data.dns && data.dns.rdata ? data.dns.rdata : 'N/A'
  let code = data.dns && data.dns.rcode ? data.dns.rcode : 'N/A'
  let dnsID = data.dns && data.dns.id ? data.dns.id : 'N/A'
  let type = data.dns && data.dns.type ? data.dns.type : 'N/A'
  let ttl = data.dns && data.dns.ttl ? data.dns.ttl : 'N/A'
  let rtype = data.dns && data.dns.rrtype ? data.dns.rrtype : 'N/A'
  let displayEventType = <div className="alerts-dns-event-container">
                          <Rows titles={["DNS Name","Data","Code"]} info={[name,dnsData,code]} />
                          <Rows titles={["ID","Type","TTL"]} info={[dnsID,type,ttl]} />
                          <Rows titles={["RType"]} info={[rtype]} />
                        </div>
     return displayEventType               
}
