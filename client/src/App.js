import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { 
  logout
} from './actions/auth';

import logo from './logo.svg';

import './App.css';


class App extends Component {
  render() {
    return(
      <div className="App">
          <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome </h2> {/*{this.props.user.username}*/}
          </div>
          <p className="App-intro">
              <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
          </p>
          </div>
    )
  }

  handleLogout(){
    this.props.logout();
    this.props.history.replace('/login');
  }

}


const mapStateToProps = (state) => ({

});



const mapDispatchToProps = (dispatch) => bindActionCreators({
  logout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);