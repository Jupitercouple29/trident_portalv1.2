import axios from 'axios'

export const updateUser = (info) => {
	let token = localStorage.getItem('jwt')
	return axios.post(process.env.REACT_APP_API_URL + '/users/update/profile', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		info:info
	})
	.then(function(response) {
		console.log(response)
		return response.data
	})
	.catch(err => {
		console.log(err)
		return err.response
	})
}