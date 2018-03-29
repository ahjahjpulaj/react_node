import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    login
} from '../../actions/auth';

import InputGroup from '../main/InputGroup';
import logo from '../../logo.png';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {};
    }
    render() {
        return (
            <div className="center">
                <div className="login-form-card">
                    <div>
                        <img src={logo} alt="ahjahjPulaj" />
                    </div>
                    <form onSubmit={this.handleFormSubmit}>
                        <InputGroup 
                            fieldname = {'username'} 
                            placeholder = { 'Username' } 
                            type = { 'text' }
                            onChange = {(e)=>this.handleChange(e)} 
                            onBlur = { ()=> {} } 
                            validate = {false} 
                            error = {""}
                        />
                        <InputGroup 
                            fieldname = {'password'} 
                            placeholder = { 'Password' } 
                            type = { 'password' }
                            onChange = {(e) => this.handleChange(e)} 
                            onBlur = { ()=> {} } 
                            validate = {false} 
                            error = {""}
                        />
                        <button type="submit"  className="btn form-submit">Log In</button>
                    </form>
                    <div className="register-container">
                        <Link to="/register" className="register-button">Register</Link>
                    </div>
                </div>
            </div>
        );
    }

    handleChange(e){
        this.setState({ [e.target.name] : e.target.value })
    }

    handleFormSubmit(e){
        e.preventDefault();
        this.props.login({username : this.state.username ,password: this.state.password}, this.props.history);
    }
}


const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
  });
  
  
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
    login,
}, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);