export const formatDate = (date) => {
		let newDate = new Date(date)
    let year = newDate.getFullYear()
    let month = ('0' + (newDate.getMonth() + 1)).slice(-2)
    let day = ('0' + newDate.getDate()).slice(-2)
    let hours = ('0' + newDate.getHours()).slice(-2)
    let min = ('0' + newDate.getMinutes()).slice(-2)
    let sec = ('0' + newDate.getSeconds()).slice(-2)
    let dateString = year + '-' + month + '-' + day + ' @ ' + hours + ':' + min + ":" + sec
    return dateString
}