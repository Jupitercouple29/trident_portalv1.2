import axios from 'axios';
import jwt from 'jsonwebtoken'
import _ from 'lodash'

/**
 * getTridents is the initial call to the backend from the portal component.
 * @param  {object}  info  an object with tridents, date, minusHours, and from 
 * @return {object}  returns an object 
 * - the info object is used to set fields in the elasticsearch query
 * - the response is an object with 
 *   * alertsLastHour  - the alerts within the last hour 
 *   * lastEventTime   - the last time an alert happened
 *   * signatureAlerts - the list of signature alerts
 *   * numOfIPs        - total number of source ips
 *   * totalAlerts     - the total number of alerts for the trident
 *   * alerts          - the most current alerts 
 */
export const getTridents = (info) => {
  let token = localStorage.getItem('jwt')
  let decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET)
  let tridents = info.tridents || decoded.user.tridents
  return axios.get(process.env.REACT_APP_API_URL + '/trident',{
    headers: {
			Authorization: `Bearer ${token}`,
		},
    params: {
      trident: tridents,
      date: info.date,
      minusHour: info.minusHour,
      from:info.from,
      queryDate:info.queryDate
    }
  })
  .then((response) => {
    let data = {
      alertsLastHour: response.data.aggregations.alerts_last_hour.buckets[0].doc_count,
      lastEventTime: response.data.hits.hits[0]._source.timestamp,
      signatureAlerts: response.data.aggregations.signature_alerts.buckets,
      numOfIPs:response.data.aggregations.source_ips.buckets.length,
      totalAlerts:response.data.hits.total,
      alerts: response.data.hits.hits
    }
    return data
  })
  .catch((error)=>{
    throw new Error(error.response)
    // return error.response
  })
}
