import axios from 'axios'

/**
 * getClientMapAlert gets the alert that is selected from the map
 * @param  {object} info   cantains the lat, long, trident, ipArray, and queryDate
 * @return {object}      returns the results from the query 
 */
export const getClientMapAlert = (info) => {
	console.log(info)
	let token = localStorage.getItem('jwt')
	return axios.get(process.env.REACT_APP_API_URL + '/trident/client/mapAlert', {
		headers:{
			Authorization: `Bearer ${token}`
		},
		params:{
			lat: info.lat,
			long: info.long,
			trident: info.trident,
			ipArray: info.ipArray,
			queryDate: info.queryDate
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