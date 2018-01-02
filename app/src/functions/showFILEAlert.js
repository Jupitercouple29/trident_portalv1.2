import React from 'react'
import Rows from '../components/dashboard-row'

export const showFILEAlert = (data) => {
	let magic = data.fileinfo && data.fileinfo.magic ? data.fileinfo.magic : 'N/A'
  let filename = data.fileinfo && data.fileinfo.filename ? data.fileinfo.filename : 'N/A'
  let size = data.fileinfo && data.fileinfo.size ? data.fileinfo.size : 'N/A'
  let stored = data.fileinfo && data.fileinfo.stored ? data.fileinfo.stored : 'N/A'
  let state = data.fileinfo && data.fileinfo.state ? data.fileinfo.state : 'N/A'
  let type = data.fileinfo && data.fileinfo.type ? data.fileinfo.type : 'N/A'
  let md5 = data.fileinfo && data.fileinfo.md5 ? data.fileinfo.md5 : 'N/A'
  let hostname = data.http && data.http.hostname ? data.http.hostname : 'N/A'
  let protocol = data.http && data.http.protocol ? data.http.protocol : 'N/A'
  let method = data.http && data.http.http_method ? data.http.http_method : 'N/A'
  let content = data.http && data.http.http_content_type ? data.http.http_content_type : 'N/A'
  let refer = data.http && data.http.http_refer ? data.http.http_refer : 'N/A'
  let url = data.http && data.http.url ? data.http.url : 'N/A'
  let agent = data.http && data.http.http_user_agent ? data.http.http_user_agent : 'N/A'
  let status = data.http && data.http.status ? data.http.status : 'N/A'
  let displayEventType = <div className="alerts-fileinfo event-container">
                          <Rows titles={["Hostname","Protocol","Method"]} info={[hostname,protocol,method]}/>
                          <Rows titles={["Status","Content","Size"]} info={[status,content,size]}/>
                          <Rows titles={["State","Type","Magic"]} info={[state,type,magic]}/>
                          <Rows titles={["Filename","URL","MD5"]} info={[filename,url,md5]}/>
                          <Rows titles={["Agent","Refer"]} info={[agent,refer]}/>
                        </div>
    return displayEventType                  
}