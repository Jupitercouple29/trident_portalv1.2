import React from 'react'
import Rows from '../components/dashboard-row'

export const showSSHAlert = (data) => {
	let sourcePort = data.source_port ? data.source_port : 'N/A'
  let destPort = data.destination_port ? data.destination_port : 'N/A'
  let city = data.geoip && data.geoip.city_name ? data.geoip.city_name : 'N/A'
  let country = data.geoip && data.geoip.country_name ? data.geoip.country_name : 'N/A'
  let postal = data.geoip && data.geoip.postal_code ? data.geoip.postal_code : 'N/A'
	let serverProto = data.ssh && data.ssh.server ? data.ssh.server.proto_version : "N/A"
	let serverSoftware = data.ssh && data.ssh.server ? data.ssh.server.software_version : "N/A"
	let clientProto = data.ssh && data.ssh.client ? data.ssh.client.proto_version : "N/A"
	let clientSoftware = data.ssh && data.ssh.client ? data.ssh.client.software_version : "N/A"
	let displayEventType = <div className="alerts-ssh-event-container">
													<Rows titles={["City", "Country", "Postal"]} info={[city,country,postal]}/>
													<Rows titles={["Source Port", "Dest Port"]} info={[sourcePort,destPort]}/>
													<Rows titles={["Server Proto", "Server Software"]} info={[serverProto,serverSoftware]}/>
													<Rows titles={["Client Proto", "Client Software"]} info={[clientProto,clientSoftware]}/>
												</div>
		return displayEventType
}