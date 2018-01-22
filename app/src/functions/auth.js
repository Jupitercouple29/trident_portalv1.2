import axios from 'axios';

export const auth = (email, pswd, loginAttempts) => {
  let user = {};
  return axios.post(process.env.REACT_APP_API_URL + '/users', {
    email:email,
    pswd:pswd,
    loginAttempts:loginAttempts
  })
  .then(function(response){
    if(response.data.jwtToken){
      localStorage.setItem('jwt', response.data.jwtToken)
      user.isValid = true;
      user.token = response.data.jwtToken;
      user.data = response.data.validUser;
      return user;
    }else{
      return response.data
    }
  })
  .catch(function(error){
    if(error === "Error: Network Error" ){
      user.isValid = false;
      user.token = '';
      user.data = 'Network Error';
      return user;
    }
    if(!error.response){
      user.isValid = false
      user.token = ''
      user.data = "Network Error"
    }else{
      console.log(error.response.data.jwtToken)
      localStorage.setItem('session', error.response.data.jwtToken)
      user.isValid = false;
      user.token = error.response.data.jwtToken;
      user.data = error.response.data.message
    }
    return user;
  })
}
