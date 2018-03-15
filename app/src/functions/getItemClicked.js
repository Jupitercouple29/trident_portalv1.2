import axios from 'axios'

export const getItemClicked = (info) => {
 	let token = localStorage.getItem('jwt')
  return axios.get(process.env.REACT_APP_API_URL + '/trident/item', {
  	headers: {
  		Authorization: `Bearer ${token}`
  	},
  	params: {
  		trident: info.trident,
  		title: info.title,
  		data: info.data,
      queryDate: info.queryDate
    }
  })
  .then(res => {
  	return res.data
  })
  .catch(err => {
  	let error
    if(err.response){
      error = err.response.data
    }else{
      error = err.message
    }
    throw new Error(error)
  })
}