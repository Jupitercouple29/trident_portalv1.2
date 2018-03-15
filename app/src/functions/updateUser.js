import axios from 'axios'

export const updateUser = (info) => {
	let token = localStorage.getItem('jwt')
	return axios.post(process.env.REACT_APP_API_URL + '/users/update/profile', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		info:info
	})
	.then(response => {
		return response.data
	})
	.catch(err => {
		let error
    if(err.response){
      error = err.response.data
    }else{
      error = err.message
    }
    throw new Error(error)
	})
}