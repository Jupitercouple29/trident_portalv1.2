import { combineReducers } from 'redux';
import { validUser,
         page,
         tridentArray,
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
         dashboardProps } from './reducers';

const rootReducer = combineReducers({
  validUser,
  page,
  tridentArray,
  selectedTrident,
  alerts,
  sourceIPs,
  destIPs,
  currentAlerts,
  dashboardProps,
  httpAlerts,
  dnsAlerts,
  tlsAlerts,
  signatureAlerts,
  locationAlerts
});

export default rootReducer;
