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
         info,
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
  info,
  signatureAlerts,
  locationAlerts
});

export default rootReducer;
