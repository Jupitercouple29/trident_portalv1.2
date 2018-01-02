import axios from 'axios';

export const auth = (email, pswd) => {
  let user = {};
  return axios.post(process.env.REACT_APP_API_URL + '/users', {
    email:email,
    pswd:pswd
  })
  .then(function(response){
    console.log(response)
    localStorage.setItem('jwt', response.data.jwtToken)
    user.isValid = true;
    user.token = response.data.jwtToken;
    user.data = response.data.validUser;
    return user;
  })
  .catch(function(error){
    if(error === "Error: Network Error" ){
      user.isValid = false;
      user.token = '';
      user.data = 'Network Error';
      return user;
    }
    user.isValid = false;
    user.token = '';
    user.data = error.response.data;
    return user;
  })
}
