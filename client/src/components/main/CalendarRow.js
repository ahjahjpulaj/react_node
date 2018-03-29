import React from 'react';
import moment from "moment";

import CalendarDay from './CalendarDay';

class DayCalendar extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        // console.log(this.props.week)
        const content = this.props.week.map(day => {
            return <CalendarDay day = { day }/>
        })
        return (
            <div className="row calendar-row">
                <div className="col">
                {content}
                </div>
            </div>
        );
    }

}

export default DayCalendar;