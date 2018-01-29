import axios from 'axios'
import request from 'superagent'

export const postReport = (info) => {
	let token = localStorage.getItem('jwt')
	console.log(info)
	// return fetch(process.env.REACT_APP_API_URL + '/reports',{
	// 	method:'POST',
	// 	body: info
	// })
	let email = info.email
	let report = info.file
	return request.post(process.env.REACT_APP_API_URL + `/reports/${email}`)
		.set({Authorization:`Bearer ${token}`})
		.send(report)
		.then(res => {
			console.log(res)
		})
		.catch(err => {
			console.log(err)
		})
	// return axios.post(process.env.REACT_APP_API_URL + `/reports/${email}`, report, {
	// 	headers:{
	// 		Authorization: `Bearer ${token}`
	// 	}
	// })
	// .then(response => {
 //    console.log(response.status);
 //    console.log(response.statusText);
 //    console.log(response.headers);
 //    console.log(response.config);
	// 	return response.data
	// })
	// .catch(err => {
	// 	console.log(err.response)
	// 	throw new Error(err.response)
	// 	// return err.response
	// })
}