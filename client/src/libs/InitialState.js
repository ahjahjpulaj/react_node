var moment = require('moment');

  let days = [];
  let startOfWeek = moment().startOf('isoWeek');
  let endOfWeek = moment().endOf('isoWeek');
  
  let day = startOfWeek;
  
  while (day <= endOfWeek) {
    days.push(day.toDate());
    day = day.clone().add(1, 'd');
  }

const InitialState = {
    date: days,
    day: moment(),
    view: "week",
}


export default InitialState;