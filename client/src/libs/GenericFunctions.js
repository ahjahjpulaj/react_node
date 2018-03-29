import months from '../json/months.json';
import days from '../json/days.json';
import moment from "moment";

const GenericFunctions = {};

GenericFunctions.getMonth= ( month ) => {
    let monthToString = '';
    months.forEach(element => {
        if(element.id === month)
            monthToString = element.monthToString
    });
    return monthToString;
}

GenericFunctions.getShortMonth = ( month, len) => {
    let monthToString = '';
    months.forEach(element => {
        if(element.id === month)
            monthToString = element.monthToString.substr(0, 3);
    });
    return monthToString;
}

GenericFunctions.getDayOfWeek = ( day ) => {
    let dayToString = '';
    days.forEach(element => {
        if(element.id === day)
            dayToString = element.dayToString;
    });
    return dayToString;
}

GenericFunctions.getDayOfWeekShort = ( day, len ) => {
    let dayToString = '';
    days.forEach(element => {
        if(element.id === day)
            dayToString = element.dayToString.substr(0, len);
    });
    return dayToString;
}


GenericFunctions.isSame = ( date1, date2 ) => {
    if ( (moment(date1).isSame(date2, "year")) &&
         (moment(date1).isSame(date2, "month")) &&
         (moment(date1).isSame(date2, "day")) )
    return true; 
}

GenericFunctions.isSameMonth = ( date1, date2 ) => {
    if ( moment(date1).isSame(date2, "month") ) 
    return true; 
}

export default GenericFunctions;