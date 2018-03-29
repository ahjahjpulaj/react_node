import React from 'react';
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    getCurrentDate,
} from '../../actions/calendar';

import { 
    showModal,
} from '../../actions/modal';

import Card from './Card';
import GenericFunctions from '../../libs/GenericFunctions';

import moment from "moment";

class Modal extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        if(!this.props.show) {
            return null;
        }
        return (
            <div className="modal-calendar"
                id={"modal-"+moment(this.props.day).get('date') + "-" + moment(this.props.day).get('month')}>
                <div className="modal-calendar-content">
                <i className="material-icons close-modal"
                onClick={()=>{this.props.showModal()}}>close</i>
                    {/* {this.props.children} */}
                    <Card day = {this.props.currentDate}/>
                </div>
            </div>
        );
    }

}


const mapStateToProps = (state) => ({
    currentDate : state.calendar.currentDate,
    show: state.modal.show,
  });
  
  
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCurrentDate,
    showModal,
}, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(Modal);