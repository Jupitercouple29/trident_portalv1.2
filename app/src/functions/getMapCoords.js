import axios from 'axios';
import jwt from 'jsonwebtoken'

export const getMapCoords = (info) => {
  let token = localStorage.getItem('jwt')
  let decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET)
  let tridents = info.tridents || decoded.user.tridents
  return axios.get(process.env.REACT_APP_API_URL + '/map/alerts',{
    headers: {
			Authorization: `Bearer ${token}`,
		},
    params: {
      trident: tridents,
      queryDate:info.queryDate
    }
  })
  .then((response) => {

    return response.data
  })
  .catch((err)=>{
    let error
    if(err.response){
      error = err.response.data
    }else{
      error = err.message
    }
    throw new Error(error)
  })
}