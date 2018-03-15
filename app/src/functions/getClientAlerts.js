import axios from 'axios'

export const getClientAlerts = (info) => {
	let token = localStorage.getItem('jwt')
	console.log(info.queryDate)
	return axios.get(process.env.REACT_APP_API_URL + '/trident/client', {
		 headers: {
			Authorization: `Bearer ${token}`,
		},
    params: {
      queryDate: info.queryDate,
			trident: info.trident, 
			ipArray: info.ipArray
    }
	})
	.then(res => {
		return res.data
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