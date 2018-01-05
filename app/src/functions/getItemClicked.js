import axios from 'axios'

export const getItemClicked = (trident, title, info) => {
 	let token = localStorage.getItem('jwt')
  let t = trident 
  console.log(title)
  console.log(info)
  return axios.get(process.env.REACT_APP_API_URL + '/trident/item', {
  	headers: {
  		Authorization: `Bearer ${token}`
  	},
  	params: {
  		trident: t,
  		title: title,
  		info: info
  	}
  })
  .then(res => {
  	return res.data
  })
  .catch(err => {
  	return err.response
  })
}