import axios from 'axios';
import jwt from 'jsonwebtoken'

export const getTridents = (info) => {
  let token = localStorage.getItem('jwt')
  let decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET)
  let tridents = info || decoded.user.tridents
  return axios.get(process.env.REACT_APP_API_URL + '/trident',{
    headers: {
			Authorization: `Bearer ${token}`,
		},
    params: {
      trident: tridents
    }
  })
  .then((response) => {
    let data = {
      alertsLastHour: response.data.aggregations.alerts_last_hour.buckets[0].doc_count,
      lastEventTime: response.data.hits.hits[0]._source.timestamp,
      signatureAlerts: response.data.aggregations.signature_alerts.buckets,
      alerts: response.data.hits.hits
    }
    return data
  })
  .catch((error)=>{
    return error.response
  })
}
