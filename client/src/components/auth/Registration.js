import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';

import { 
    handleInputChange
} from '../../actions/helpers';

const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
    <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
      <input type={type} placeholder={placeholder} {...input} />
      { touched && error && <div className="form-error">{error}</div> }
    </div>
  );
//   const renderField = (field) => (
//     <div className="input-row">
//       <input {...field.input} type="text"/>
//       {field.meta.touched && field.meta.error &&
//        <span className="error">{field.meta.error}</span>}
//     </div>
//   )

class Registrazione extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.errors = {};
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="center">
                <div className="card">
                <h1>Registrazione</h1>
                <form onSubmit={(e)=>this.handleFormSubmit(e)}>
                    <input
                        className={this.errors.firstname ? "form-item-error" : "form-item"}
                        placeholder="First name"
                        name="firstname"
                        type="text"
                        onChange={(e)=>this.handleChange(e)}
                        onBlur={(e)=>this.handleBlur(e)}
                    />
                    {this.errors.firstname ? <span className="error"> {this.errors.firstname} </span> : ''}
                    <input
                        className={this.errors.lastname ? "form-item-error" : "form-item"}
                        placeholder="Last name"
                        name="lastname"
                        type="text"
                        onChange={(e)=>this.handleChange(e)}
                        onBlur={(e)=>this.handleBlur(e)}
                    />
                    {this.errors.lastname ? <span className="error"> {this.errors.lastname} </span> : ''}
                    <input
                        className={this.errors.email ? "form-item-error" : "form-item"}
                        placeholder="Email"
                        name="email"
                        type="text"
                        onChange={(e)=>this.handleChange(e)}
                        onBlur={(e)=>this.handleBlur(e)}
                    />
                    {this.errors.email ? <span className="error"> {this.errors.email} </span> : ''}
                    <input
                        className={this.errors.password ? "form-item-error" : "form-item"}
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={(e)=>this.handleChange(e)}
                        onBlur={(e)=>this.handleBlur(e)}
                    />
                    {this.errors.password ? <span className="error"> {this.errors.password} </span> : ''}
                    <input
                        className={this.errors.repassword ? "form-item-error" : "form-item"}
                        placeholder="Repeat Password"
                        name="repassword"
                        type="password"
                        onChange={(e)=>this.handleChange(e)}
                        onBlur={(e)=>this.handleBlur(e)}
                    />
                    {this.errors.repassword ? <span className="error"> {this.errors.password} </span> : ''}
                    {/* Server error message */}
                    <div>
                        { this.props.errorMessage && this.props.errorMessage.signup &&
                            <div className="error-container">Oops! { this.props.errorMessage.signup }</div> }
                    </div>

                    {/* Submit button */}
                    <button type="submit"  className="form-submit">Sign up</button>

                    {/* Sign in button */}
                    <div className="form-bottom">
                        <p>Already signed up?</p>
                        <Link to="/login">Click here to sign in</Link>
                    </div>
                    </form>
                    <div>
                    </div>
                </div>
            </div>
        );
    }
    handleChange(e){
        // {(e)=>this.handleChange(e)};
        this.props.handleInputChange(e.target.name, e.target.value);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        console.log(this.props);
    // this.props.signupUser(formProps);
  }
  handleBlur(e) {
      console.log(e);
      console.log(e.target);
      let errors = this.validate(e.target.name, e.target.value);
      console.log(errors);
  }
    validate = (name, value) => {
        
        switch(name) {
            case "firstname":
                if(value.length < 3) {
                    this.errors.firstname = "minimum of 4 characters";
                }
                if(value.length > 20) {
                    this.errors.firstname = "maximum of 20 characters";
                }
                return this.errors;
            break;
            case "lastname":
                if(value.length < 3) {
                    this.errors.lastname = "minimum of 4 characters";
                }

                if(value.length > 20) {
                    this.errors.lastname = "maximum of 20 characters";
                }
                return this.errors;
            break;
            case "email":
                if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    this.errors.email = "please provide valid email";
                }
                return this.errors;
            break;
            case "password":
                if(value.length < 6) {
                    this.errors.password = "minimum 6 characters";
                }
                return this.errors;
            break;
            case "repassword":
                if(this.props.password !== value) {
                    this.errors.repassword = "passwords doesn't match";
                }
                return this.errors;
            break;
            default:
                return this.errors;
            break;
        }
    };
}

const mapStateToProps = (state) => ({
    username: state.helper.username,
    firstname: state.helper.firstname,
    lastname: state.helper.lastname,
    email: state.helper.email,
    password: state.helper.password,
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
  });

const mapDispatchToProps = (dispatch) => bindActionCreators({
    handleInputChange
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Registrazione);