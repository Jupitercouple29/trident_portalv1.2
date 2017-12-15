import { combineReducers } from 'redux';
import { validUser,
         page,
         info,
         selectedTrident,
         alerts,
         sourceIPs,
         destIPs,
         currentAlerts,
         signatureAlerts,
         dnsAlerts,
         httpAlerts,
         tlsAlerts,
         locationAlerts,
         allAlerts } from './reducers';

const rootReducer = combineReducers({
  validUser,
  page,
  info,
  selectedTrident,
  alerts,
  sourceIPs,
  destIPs,
  currentAlerts,
  allAlerts,
  httpAlerts,
  dnsAlerts,
  tlsAlerts,
  signatureAlerts,
  locationAlerts
});

export default rootReducer;
