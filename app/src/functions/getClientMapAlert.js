import request from 'superagent'

export const getClientMapAlert = (info) => {
	let lat = info.lat
	let long = info.long
	let trident = info.trident
	let ipArray = info.ipArray
	let token = localStorage.getItem('jwt')
	return request.get(process.env.REACT_APP_API_URL + '/trident/client/mapAlert')
		.set({Authorization:`Bearer ${token}`})
		.query({info})
		.then(res => {
			return res.body
		})
		.catch(err => {
			console.log(err)
			throw new Error(err)
		})
}