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
		let error
    if(err.response){
      error = err.response.data
    }else{
      error = err.message
    }
    throw new Error(error)
	})
}