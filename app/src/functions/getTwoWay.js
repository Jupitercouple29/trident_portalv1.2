import axios from 'axios'

export const getTwoWay = (info) => {
	let token = localStorage.getItem('jwt')
	console.log(info)
	let trident = info.trident
	let index = info.index
	let date = info.date._d
	let ip = info.ip
	console.log(date)
	return axios.get(process.env.REACT_APP_API_URL + '/soc/two-way',{
		headers: {
			Authorization: `Bearer ${token}`
		},
		params: {
			trident,
			index,
			date,
			ip
		}
	})
	.then(response => {
		console.log(response.data)
		return response.data
	})
	.catch(err => {
		console.log(err)
		console.log(err.message)
		console.log(err.response)
		let error
		if(err.response){
			error = err.response.data
		}else{
			error = err.message
		}
		// return err.response
		throw new Error(error)
	})
}
