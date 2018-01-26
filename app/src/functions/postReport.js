import axios from 'axios'

export const postReport = (info) => {
	let token = localStorage.getItem('jwt')
	console.log(info)
	return axios.post(process.env.REACT_APP_API_URL + '/reports', {
		headers:{
			Authorization: `Bearer ${token}`,
			"Content-Type": 'application/pdf'
		},
		info:info
	})
	.then(response => {
		return response.data
	})
	.catch(err => {
		console.log(err.response)
		throw new Error(err.response)
		// return err.response
	})
}