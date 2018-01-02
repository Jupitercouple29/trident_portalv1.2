

export const configureAlertType = (alertFunc, trident) => {
	let alert = []
	alertFunc(trident)
	.then(res=>{
		alert = res
		console.log(res)
		return res
	})
	return alert

}