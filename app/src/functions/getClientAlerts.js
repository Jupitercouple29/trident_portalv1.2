import request from 'superagent'

export const getClientAlerts = (trident, ipArray) => {
	let token = localStorage.getItem('jwt')
	return request.get(process.env.REACT_APP_API_URL + '/trident/client')
		.set({Authorization:`Bearer ${token}`})
		.query({trident, ipArray})
		.then(res => {
			return res.body
		})
		.catch(err => {
			console.log(err)
			throw new Error(err)
		})
}