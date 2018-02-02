import axios from 'axios'

export const getReports = (email) => {
	let token = localStorage.getItem('jwt')
	return axios.get(process.env.REACT_APP_API_URL + '/reports', {
		headers:{
			Authorization: `Bearer ${token}`
		},
		params:{
			email: email
		}
	})
	.then(response => {
		return response.data
	})
	.catch(err => {
		throw new Error(err.response)
		// return err.respoonse
	})
}