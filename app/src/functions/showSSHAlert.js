import React from 'react'
import Rows from '../components/dashboard-row'

export const showSSHAlert = (data) => {
	let serverProto = data.ssh && data.ssh.server ? data.ssh.server.proto_version : "N/A"
	let serverSoftware = data.ssh && data.ssh.server ? data.ssh.server.software_version : "N/A"
	let clientProto = data.ssh && data.ssh.client ? data.ssh.client.proto_version : "N/A"
	let clientSoftware = data.ssh && data.ssh.client ? data.ssh.client.software_version : "N/A"
	let displayEventType = <div className="alerts-ssh-event-container">
													<Rows titles={["Server Proto", "Server Software"]} info={[serverProto,serverSoftware]}/>
													<Rows titles={["Client Proto", "Client Software"]} info={[clientProto,clientSoftware]}/>
												</div>
		return displayEventType
}