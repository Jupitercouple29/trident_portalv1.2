import axios from 'axios';
import jwt from 'jsonwebtoken'

/**
 * getAlerts is used to call the backend with a specific type of alert to 
 * search for. 
 * ex. info = {
 *  trident: 2411,
 *  type: dns,
 *  from: 1000
 * }
 * @param  {object} info  is an object with trident, type and from
 * @return {array} returns an array of alerts 
 */
export const getAlerts = (info) => {
  let token = localStorage.getItem('jwt')
  let decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET)
  let trident = info.trident || decoded.user.tridents
  let type = info.type
  let startFrom = info.from 
  return axios.get(process.env.REACT_APP_API_URL + `/trident/alerts/${type}`,{
    headers: {
			Authorization: `Bearer ${token}`,
		},
    params: {
      trident: trident,
      from: startFrom
    }
  })
  .then((response) => {
    return response.data
  })
  .catch((error)=>{
    return error.response
  })
}