import axios from 'axios';
import jwt from 'jsonwebtoken'

export const getAlerts = (info,type) => {
  let token = localStorage.getItem('jwt')
  let decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET)
  let tridents = info || decoded.user.tridents
  return axios.get(process.env.REACT_APP_API_URL + `/trident/alerts/${type}`,{
    headers: {
			Authorization: `Bearer ${token}`,
		},
    params: {
      trident: tridents
    }
  })
  .then((response) => {
    return response.data
  })
  .catch((error)=>{
    return error.response
  })
}