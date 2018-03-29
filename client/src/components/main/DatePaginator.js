import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GenericFunctions from '../../libs/GenericFunctions'

import { 
    changeView,
    getDate,
    getCurrentDay,
    getCurrentDate,
} from '../../actions/calendar';

import moment from "moment";

class DatePaginator extends React.Component {
    constructor(props){
        super(props);
        this.goToPrevious = this.goToPrevious.bind(this);
        this.goToNext = this.goToNext.bind(this);
        this.goToCurrent = this.goToCurrent.bind(this);
        this.changeView = this.changeView.bind(this);
        this.setDate = this.setDate.bind(this);
    }
    

    render() {
        let current = "";
        if(this.props.view ==="week"){
            current = this.props.date.map(day => {
                return <li className={ GenericFunctions.isSame(day, this.props.currentDate) ? "calendar-pagination-list highlight" : "calendar-pagination-list"} 
                id={"pag-"+day.getDate()}> 
                        <p className="day" onClick={()=> this.setDate(day)}> {day.getDate()} </p>
                    </li>
            })
        }else {
            current = 
            <p className="month"> {GenericFunctions.getDayOfWeek(moment(this.props.currentDate).day()) + " " +moment(this.props.currentDate).get('date') + " " + GenericFunctions.getMonth(moment(this.props.currentDate).get('month')+1)} </p>
        }
        return (
            <div className="margin-bottom-30">
                <div className="row">
                    <div className="col-2">
                    <div className="row"> 
                    <div className="col-6">
                        <button type="button" id="prev-button" className="btn btn-light button-calendar" onClick={() => this.goToPrevious()}><i className="material-icons">keyboard_arrow_left</i></button>
                        </div>
                        <div className="col-6">
                        <button type="button"  id="next-button" className="btn btn-light button-calendar"onClick={() => this.goToNext()}><i className="material-icons">keyboard_arrow_right</i></button>
                        </div>
                    </div>
                    </div>
                    <div className="col-1">
                    <button type="button" className="btn btn-light button-calendar" onClick={() => this.goToCurrent()}>Today</button>
                    </div>
                    <div className="col-6">
                        <ul className="calendar-pagination">
                            {current}
                        </ul>
                    </div>
                    <div className="col-3">
                        <div className="row"> 
                            <div className="col-6">
                                <button type="button" id="month-button" className="btn btn-light button-calendar" onClick={() => this.changeView('month')}>Month</button>
                            </div>
                            <div className="col-6">
                                <button type="button" id="week-button" className="btn btn-light button-calendar" onClick={() => this.changeView('week')}>Week</button>
                            </div>
                        </div>
                    </div>        
                </div>
          </div>
        );
    }


    componentWillMount(){
        this.props.getCurrentDay();
        this.props.getCurrentDate();
    }

    goToPrevious(){
        let date = this.changeWeek(-1);
        this.props.getDate(date);
    }
    goToNext(){
        let date = this.changeWeek(1);
        this.props.getDate(date);
    }
    goToCurrent(){
        let date = this.dateFormatter(this.props.currentDay, this.props.view);
        this.props.getCurrentDate(this.props.currentDay);
        this.props.getDate(date);
    }
    changeView(value){
        let date = this.dateFormatter(this.props.currentDate, value);
        this.props.changeView(value);
        this.props.getDate(date);
    }

    changeWeek(operator){
        return this.dateFormatter(this.props.date[0], this.props.view, operator);
    }

    setDate(date){
        console.log(date);
        return this.props.getCurrentDate(date);
    }

    dateFormatter(date, view, operator){
        let viewCtrl = '';
        if(view === "week"){
            viewCtrl = "isoWeek";
        }else if (view === "month"){
            viewCtrl = "month";
        }
        let days = [];
        let startOf = moment(date).startOf(viewCtrl);
        let endOf = moment(date).endOf(viewCtrl);

        if (operator>0) {
            startOf = moment(startOf).add(1, view); 
            endOf = moment(endOf).add(1, view);
            this.props.getCurrentDate(moment(this.props.currentDate).add(1, view)); 
        } else if (operator<0) {
            startOf = moment(startOf).subtract(1, view); 
            endOf = moment(endOf).subtract(1, view);
            this.props.getCurrentDate(moment(this.props.currentDate).subtract(1, view));
        }

        let day = startOf;

        while (day <= endOf) {
            days.push(day.toDate());
            day = day.clone().add(1, 'd');
        }
        return days;
    }
}


const mapStateToProps = (state) => ({
    user : state.auth.user,
    date : state.calendar.date,
    view : state.calendar.view,
    currentDate : state.calendar.currentDate,
    currentDay : state.calendar.currentDay,
  });
  
  
  
  const mapDispatchToProps = (dispatch) => bindActionCreators({
    changeView,
    getDate,
    getCurrentDay,
    getCurrentDate,
  }, dispatch);
  
  
export default connect(mapStateToProps, mapDispatchToProps)(DatePaginator);