import axios from 'axios';
import jwt from 'jsonwebtoken'

export const getTridentAlerts = (info) => {
  let token = localStorage.getItem('jwt')
  let decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET)
  let trident = info.trident || decoded.user.tridents
  return axios.get(process.env.REACT_APP_API_URL + '/trident/alerts',{
    headers: {
			Authorization: `Bearer ${token}`,
		},
    params: {
      trident: trident,
      queryDate: info.queryDate
    }
  })
  .then((response) => {
    return response.data
  })
  .catch((error)=>{
    return error.response
  })
}