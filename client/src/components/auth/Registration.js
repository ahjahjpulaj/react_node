import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';

import InputGroup from '../main/InputGroup';
import { 
    register
} from '../../actions/auth';

class Registrazione extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.state ={errors : {}};
    }
    render() {
        return (
            <div className="center">
                <div>
                <h1>Registrazione</h1>
                <form onSubmit={(e)=>this.handleFormSubmit(e)}>
                    <InputGroup 
                        fieldname = {'firstname'} 
                        placeholder = { 'First Name' } 
                        type = { 'text' }
                        onChange = {(e)=>this.handleChange(e)} 
                        onBlur = {(e)=>this.handleBlur(e)} 
                        validate = {false} 
                        error = {this.state.errors.firstname}
                    />
                    <InputGroup 
                        fieldname = {'lastname'} 
                        placeholder = { 'Last Name' } 
                        type = { 'text' } 
                        onChange = {(e)=>this.handleChange(e)} 
                        onBlur = {(e)=>this.handleBlur(e)}
                        validate = {false} 
                        error = {this.state.errors.lastname}
                    />
                    <InputGroup 
                        fieldname = {'username'} 
                        placeholder = { 'Username' } 
                        type = { 'text' }
                        onChange = {(e)=>this.handleChange(e)} 
                        onBlur = {(e)=>this.handleBlur(e)} 
                        validate = {false} 
                        error = {this.state.errors.username}
                    />
                    <InputGroup 
                        fieldname = {'password'} 
                        placeholder = { 'Password' } 
                        type = { 'password' } 
                        onChange = {(e)=>this.handleChange(e)} 
                        onBlur = {(e)=>this.handleBlur(e)} 
                        validate = {false} 
                        error = {this.state.errors.password}
                    />
                    <InputGroup 
                        fieldname = {'repassword'} 
                        placeholder = { 'Repeat Password' } 
                        type = { 'password' } 
                        onChange = {(e)=>this.handleChange(e)} 
                        onBlur = {(e)=>this.handleBlur(e)} 
                        validate = {false} 
                        error = {this.state.errors.repassword}
                    />
                    <div className="form-footer-container">
                        {/* Server error message */}
                        <div>
                            { this.props.errorMessage && this.props.errorMessage.signup &&
                                <div className="error-container">Oops! { this.props.errorMessage.signup }</div> }
                        </div>

                        {/* Submit button */}
                        <button type="submit"  className="btn form-submit" disabled={Object.keys(this.state.errors).length>0}>Sign up</button>
                        {/* Sign in button */}
                        <div className="login-link">
                            <p className="w-p" >Already signed up?</p>
                            <Link className="anchor" to="/login">Click here to sign in</Link>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        );
    }
    handleChange(e){
        if(this.state.errors[e.target.name]){
            let errors = this.validate(e.target.name, e.target.value);
            this.setState({errors : errors});
        }
        console.log(this.state.errors[e.target.name]);
        // console.log(this.state.errors);
        if(this.state.errors["requiredFields"]){
            delete this.state.errors["requiredFields"]
        }
        this.setState( ...this.state, { [e.target.name] : e.target.value });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        console.log(this.state.errors);
        if(Object.keys(this.state.errors).length === 0){
            if(this.state.email && this.state.username && this.state.password && this.state.repassword && this.state.firstname && this.state.lastname){
                this.props.register({email : this.state.email, username: this.state.username, password: this.state.password, firstname: this.state.firstname , lastname: this.state.lastname}, this.props.history);
            }else{
                let errors = { requiredFields : "Field Required"};
                this.setState({errors : errors})
            }
        }
    // this.props.signupUser(formProps);
  }
  handleBlur(e) {
      let errors = this.validate(e.target.name, e.target.value);
      this.setState({errors : errors})
  }
    validate = (name, value) => {
        let err = {...this.state.errors};
        switch(name) {
            case "firstname":
                if(value.length < 3) {
                    err.firstname = "minimum of 3 characters";
                }else if(value.length > 20) {
                    err.firstname = "maximum of 20 characters";
                }else{ 
                    if (err.firstname)
                    delete err['firstname']; 
                }
                return err;
            case "lastname":
                if (value.length < 3) {
                    err.lastname = "minimum of 3 characters";
                } else if (value.length > 20) {
                    err.lastname = "maximum of 20 characters";
                } else {
                    if (err.lastname)
                    delete err['lastname']; 
                }
                return err;
            case "username":
                if (value.length < 3) {
                    err.username = "minimum of 3 characters";
                } else if (value.length > 20) {
                    err.username = "maximum of 20 characters";
                } else {
                    if (err.username)
                    delete err['username']; 
                }
                return err;
            case "email":
                if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    err.email = "please provide valid email";
                } else {
                    if (err.email)
                    delete err['email']; 
                }
                return err;
            case "password":
                if(value.length < 6) {
                    err.password = "minimum 6 characters";
                } else {
                    if (err.password)
                    delete err['password']; 
                }
                return err;
            case "repassword":
                if(this.state.password !== value) {
                    err.repassword = "passwords doesn't match";
                } else {
                    if (err.repassword)
                    delete err['repassword']; 
                }
                return err;
            default:
                return err;
        }
    };
}

const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
  });

const mapDispatchToProps = (dispatch) => bindActionCreators({
    register
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Registrazione);