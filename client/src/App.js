import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom'; 

import Card from './components/main/Card';
import Modal from './components/main/Modal';
import Calendar from './components/main/Calendar';
import DatePaginator from './components/main/DatePaginator';
import SideNavAdv from './components/adv/SideNavAdv';

import { store } from './store/ConfigureStore';

import { 
  logout
} from './actions/auth';

import { 
  GET_DATE,
  GET_CURRENT_DATE,
} from './actions/calendar';


import logo from './logo.png';

import './App.css';

import moment from "moment";


class App extends Component {
  render() {
    let contents = "";
    if(this.props.view === "week"){
      contents = this.props.date.map(day => {
        return(
          <Card day = { day }/>
        )
      })
    }else if (this.props.view === "month"){
      contents = <Calendar days = {this.props.date}/>  
    }
    return(
      <div className="App">
          {/* HEADER */}
          <div className="App-header">
            <div className="row">
              <div className="col-2">
                {/* LOGO */}
                <img src={logo} alt="ahjahjPulaj" />
                {/* LOGO */}
              </div>
              <div className="col-6">
                {/* SEARCH BAR */}
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"><i className="material-icons">search</i></span>
                  </div>
                  <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1"/>
                </div>
                 {/* SEARCH BAR */}
                </div>
              <div className="col-2">
                {this.props.user.username} - {this.props.user.firstname} {this.props.user.lastname}
              </div>
              <div className="col-1">
              {/* DROPDOWN */}
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="material-icons">settings</i>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" >Profile</a>
                  <a className="dropdown-item" >Other action</a>
                  <a className="dropdown-item" onClick={this.handleLogout.bind(this)}>Logout</a>
                </div>
              </div>
              {/* DROPDOWN */}
              </div>
            </div>
          </div>
          {/* HEADER */}
          {/* BODY */}
          <div className="App-body">
            <div className="row">
              <div className="col-2">
                {/* SIDENAV */}
                <nav className="nav flex-column App-sidenav">
                <div> 
                  <i className="material-icons">home</i>
                  <Link to="/">Home</Link>
                </div>
                <div> 
                  <i className="material-icons">tag_faces</i>
                  <Link to="/ipsum">Lorem</Link>
                </div>
                <div> 
                  <i className="material-icons">dashboard</i>
                  <Link to="/ipsum">Ipsum</Link>
                </div>
                <div> 
                <i className="material-icons">vpn_key</i>
                  <Link to="/admin">Admin</Link>
                </div>
                </nav>
                {/* SIDENAV */}
              </div>
              <div className="col-6">
                {/* CONTENT */}
                <DatePaginator />
                <div className={this.props.view === "week" ? "contents" : "calendar-contents"}>
                  {contents}
                </div>
                {/* CONTENT */}
              </div>
              <div className="col-3">
              {/* PUBBLICITA */}
                <div className="advertising">
                  {/* <SideNavAdv /> */}
                </div>
              {/* PUBBLICITA */}
              </div>
            </div>
          </div>
          {/* BODY */}
          {/* FOOTER */}
          {/* FOOTER */}
        <Modal/>
        </div>
    )
  }

  handleLogout(){
    this.props.logout();
    this.props.history.replace('/login');
  }

}


const mapStateToProps = (state) => ({
  user : state.auth.user,
  date : state.calendar.date,
  view : state.calendar.view,
  currentDate : state.calendar.currentDate,
});



const mapDispatchToProps = (dispatch) => bindActionCreators({
  logout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);