import axios from 'axios'
import request from 'superagent'

export const postReport = (info) => {
	let token = localStorage.getItem('jwt')
	console.log(info)
	// return fetch(process.env.REACT_APP_API_URL + '/reports',{
	// 	method:'POST',
	// 	body: info
	// })

	return request.post(process.env.REACT_APP_API_URL + '/reports')
		.set({Authorization:`Bearer ${token}`})
		// .set({'Content-Type':'multipart/form-data'})
		.send(info)
		// .send(info.email)
		.then(res => {
			console.log(res)
		})
		.catch(err => {
			console.log(err)
		})
	// return axios.post(process.env.REACT_APP_API_URL + '/reports', {
	// 	info
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