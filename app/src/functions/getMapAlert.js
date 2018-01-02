import axios from 'axios';

export const getMapAlert = (info) => {
  let lat = info.lat
  let long = info.long
  let trident = info.trident
  let token = localStorage.getItem('jwt')
  return axios.get(process.env.REACT_APP_API_URL + '/map/alerts/alert', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      lat,
      long,
      trident
    }
  })
  .then((response) => {
    return (response.data)
  })
  .catch((error)=>{
    console.log(error)
    return error.response
  })
}