const moment = require('moment');

const getMomentInfo = (date) => {
	const today = moment().format('D/M/YYYY, h:mm:ss a')
	const birthday = moment(date, "DD/MM/YYYY")
	const birthdayYear = moment(date, "YYYY")
	const timePassedFromDate = moment(today, "D/M/YYYY").diff(birthdayYear, "years");
	const timePassedFromDateInDays = moment(today, "D/M/YYYY").diff(birthday, "days")

	return `	
		hoy es: ${today} \n
		Mi cumple es: ${birthday} \n
		han pasado ${timePassedFromDate} años desde que nací \n
		han pasado ${timePassedFromDateInDays} dias desde que nací`
}


console.log(getMomentInfo("21/07/1996"))




