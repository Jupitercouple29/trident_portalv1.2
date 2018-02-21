import axios from 'axios'

export const getTwoWay = (info) => {
	let token = localStorage.getItem('jwt')
	console.log(info)
	let trident = info.trident
	let index = info.index
	let date = info.date._d
	let ip = info.ip
	let time = info.time
	console.log(date)
	return axios.get(process.env.REACT_APP_API_URL + '/soc/two-way',{
		headers: {
			Authorization: `Bearer ${token}`
		},
		params: {
			trident,
			index,
			date,
			ip,
			time
		}
	})
	.then(response => {
		console.log(response.data)
		return response.data
	})
	.catch(err => {
		console.log(err)
		return err.response
		// throw new Error(err.response)
	})
}
