import React from 'react';
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  getCurrentDate,
} from '../../actions/calendar';

import If from '../utility/If';
import IfElse from '../utility/IfElse';
import InputGroup from './InputGroup';
import OrariRow from './OrariRow';
import TimesheetRow from './TimesheetRow';
import GenericFunctions from '../../libs/GenericFunctions';

import moment from "moment";

class Card extends React.Component {
  constructor(props){
    super(props);
    this.setDay = this.setDay.bind(this);
    this.editCard = this.editCard.bind(this);
    this.saveCard = this.saveCard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addRow = this.addRow.bind(this);
    this.state = {edit : false};
  }
  render() {
    let orari = [];
    if(this.props.day.orari){
      orari = this.props.day.orari
    }
    console.log(this.props.day.orari);
    // let orari = ["09:00", "12:00", "13:00", "14:00", "14:30", "18:00"];
    let orariNormalized = orari.reduce(function(result, value, index, array) {
      if (index % 2 === 0)
        result.push(array.slice(index, index + 2));
      return result;
    }, []);
    let orariRow = orariNormalized.map( (row, index) => {
      return(
        <OrariRow edit={this.state.edit} row = {row} index = {index} onChange = { (e) => this.handleChange(e) }/>
      )
    })
    return (
      <div className={ GenericFunctions.isSame(this.props.day, this.props.currentDate) ? "card margin-bottom-30 highlight" : "card margin-bottom-30"} 
      id={moment(this.props.day).get('date') + "-" + moment(this.props.day).get('month')}
      onClick={this.setDay}>
          <h5 className="card-header">{moment(this.props.day).get('date') + "  " + GenericFunctions.getMonth(moment(this.props.day).get('month')+1)+ "  " + (moment(this.props.day).get('year'))}</h5>
          {/* CARD BODY */}
          <div className="card-body">
          { /*ROW ORARI*/ }
          { orariRow }
          {/* <OrariRow edit={this.state.edit} onChange = { (e) => this.handleChange(e) }/> */}
          { /*ROW ORARI*/ }

          {/* PIANO SECTION */}
          <If condition = { this.state.edit } >
          <TimesheetRow />
            {/*<div className="row piano-row">
                <div className="col-2">
                  <InputGroup 
                    fieldname = {'numeroOre'} 
                    placeholder = { 'N. Ore' } 
                    type = { 'number' }
                    onChange = {(e) => this.handleChange(e)} 
                    onBlur = { ()=> {} } 
                    validate = {false} 
                    error = {""}
                  />
                </div>
                <div className="col-9">
                  <InputGroup 
                    fieldname = {'description'} 
                    placeholder = { 'Descrizione attività' } 
                    type = { 'text' }
                    onChange = { (e) => this.handleChange(e) } 
                    onBlur = { ()=> {} } 
                    validate = {false} 
                    error = {""}
                />
                </div>
                <div className="col-1">
                  <button type="button" className="btn btn-add-row" 
                      onClick={ (e) => this.addRow(e) }>
                      <i className="material-icons">add</i>
                  </button>
                </div>
              </div>
            */}
            </If>
          {/* PIANO SECTION */}
          </div>
          {/* CARD BODY */}
          {/* CARD ACTIONS */}
          <div className="row">
            <If condition = {GenericFunctions.isSame(this.props.day, this.props.currentDate)}>
              <IfElse condition = { this.state.edit }
                ifComponent = {
                  <button type="button" className="btn btn-light card-button" 
                      onClick={ (e) => this.saveCard(e) }>
                    <i className="material-icons">done</i>
                  </button>
                  }
                elseComponent = {
                  <button type="button" className="btn btn-light card-button" 
                    onClick={ (e) => this.editCard(e) }>
                    <i className="material-icons">mode_edit</i>
                  </button>
                }>
              </IfElse>
            </If>
          </div>
          {/* CARD ACTIONS */}
        </div>
    );
  }

  setDay(){
    if(!GenericFunctions.isSame(this.props.day, this.props.currentDate)){
      this.setState({ edit : false })
      this.props.getCurrentDate(this.props.day);
    }
  }

  editCard(e){
    e.stopPropagation();
    this.setState( { edit : true } );
  }

  saveCard(e){
    e.stopPropagation();
    console.log(this.state);
    this.setState( { edit : false } );
  }
  
  addRow(){

  }

  handleChange(e){
    this.setState( ...this.state, { [e.target.name] : e.target.value });
  }
}

const mapStateToProps = (state) => ({
  currentDate : state.calendar.currentDate,
});



const mapDispatchToProps = (dispatch) => bindActionCreators({
  getCurrentDate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Card);
// export default Card;