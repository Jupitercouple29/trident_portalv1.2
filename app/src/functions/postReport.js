import axios from 'axios'
import request from 'superagent'

export const postReport = (info) => {
	let token = localStorage.getItem('jwt')
	let email = info.email
	let report = info.file
	let reportName = info.file.name 
	return request.post(process.env.REACT_APP_API_URL + `/reports/${email}/${reportName}`)
		.set({Authorization:`Bearer ${token}`})
		.send(report)
		.then(res => {
			return res
			// console.log(res)
		})
		.catch(err => {
			console.log(err.response.text)
			throw new Error(err.response.text)
			
		})
}