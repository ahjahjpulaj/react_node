import React from 'react';
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    getCurrentDate,
} from '../../actions/calendar';
import { 
    showModal
} from '../../actions/modal';

import GenericFunctions from '../../libs/GenericFunctions';

import moment from "moment";

class DayCalendar extends React.Component {
    constructor(props){
        super(props);
        this.setDay = this.setDay.bind(this);
        this.openCard = this.openCard.bind(this);
    }
    render() {
        const dayDisabled = !GenericFunctions.isSameMonth(this.props.day, this.props.currentDate) ? "day-disabled" : "";
        const hightlight = GenericFunctions.isSame(this.props.day, this.props.currentDate) ? "highlight" : "";
        let classes = "card calendar-card " + dayDisabled +" "+ hightlight;
        
        return (
            <div className={classes}
                id={moment(this.props.day).get('date') + "-" + moment(this.props.day).get('month')}
                onClick = {this.setDay}
                onDoubleClick = {() => this.openCard(this.props.day)}>
                <h5 className="card-header">{GenericFunctions.getDayOfWeekShort(moment(this.props.day).day(), 1)}</h5>
                {/* CARD BODY */}
                <div className="card-body unselectable">
                    {moment(this.props.day).get('date')}
                </div>
                {/* CARD BODY */}
            </div>
        );
    }

    setDay(){
        if(GenericFunctions.isSameMonth(this.props.day, this.props.currentDate))
            this.props.getCurrentDate(this.props.day);
    }

    openCard(){
        if(GenericFunctions.isSameMonth(this.props.day, this.props.currentDate))
            this.props.showModal(true);
    }

}


const mapStateToProps = (state) => ({
    currentDate : state.calendar.currentDate,
  });
  
  
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCurrentDate,
    showModal,
}, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(DayCalendar);