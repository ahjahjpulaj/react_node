import React from 'react';
import moment from "moment";

import CalendarRow from './CalendarRow';

class Calendar extends React.Component {
    constructor(props){
        super(props);
        this.handleWeeks = this.handleWeeks.bind(this);
    }
    render() {
        let weeks = this.handleWeeks();
        let content = weeks.map(week => {
            return <CalendarRow week = {week} />
        })
        return (
            <div className="row calendar">
            <div className="col">
                {content}
            </div>
            </div>
        );
    }

    handleWeeks() {
        const firstDay = moment(this.props.days[0]);
        const endOf = moment(this.props.days[0]).endOf("month");
        let weeks = [];
        let day = firstDay;
        while (moment(day).startOf("isoWeek") <= endOf) {
            weeks.push(this.dateFormatter(day));
            day = day.clone().add(7, 'd');
        }
        return weeks;
    }

    dateFormatter(date){
        let days = [];
        let startOf = moment(date).startOf("isoWeek");
        let endOf = moment(date).endOf("isoWeek");

        let day = startOf;

        while (day <= endOf) {
            days.push(day.toDate());
            day = day.clone().add(1, 'd');
        }
        return days;
    }
}

export default Calendar;