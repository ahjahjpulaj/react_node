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
        this.state ={errors : {}};
    }
    render() {
        console.log(this.state);
        const { handleSubmit } = this.props;
        return (
            <div className="center">
                <div className="card">
                <h1>Registrazione</h1>
                <form onSubmit={(e)=>this.handleFormSubmit(e)}>
                    <input
                        className={this.state.errors.firstname ? "form-item-error" : "form-item"}
                        placeholder="First name"
                        name="firstname"
                        type="text"
                        onChange={(e)=>this.handleChange(e)}
                        onBlur={(e)=>this.handleBlur(e)}
                    />
                    {this.state.errors.firstname ? <span className="error"> {this.state.errors.firstname} </span> : ''}
                    <input
                        className={this.state.errors.lastname ? "form-item-error" : "form-item"}
                        placeholder="Last name"
                        name="lastname"
                        type="text"
                        onChange={(e)=>this.handleChange(e)}
                        onBlur={(e)=>this.handleBlur(e)}
                    />
                    {this.state.errors.lastname ? <span className="error"> {this.state.errors.lastname} </span> : ''}
                    <input
                        className={this.state.errors.email ? "form-item-error" : "form-item"}
                        placeholder="Email"
                        name="email"
                        type="text"
                        onChange={(e)=>this.handleChange(e)}
                        onBlur={(e)=>this.handleBlur(e)}
                    />
                    {this.state.errors.email ? <span className="error"> {this.state.errors.email} </span> : ''}
                    <input
                        className={this.state.errors.password ? "form-item-error" : "form-item"}
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={(e)=>this.handleChange(e)}
                        onBlur={(e)=>this.handleBlur(e)}
                    />
                    {this.state.errors.password ? <span className="error"> {this.state.errors.password} </span> : ''}
                    <input
                        className={this.state.errors.repassword ? "form-item-error" : "form-item"}
                        placeholder="Repeat Password"
                        name="repassword"
                        type="password"
                        onChange={(e)=>this.handleChange(e)}
                        onBlur={(e)=>this.handleBlur(e)}
                    />
                    {this.state.errors.repassword ? <span className="error"> {this.state.errors.password} </span> : ''}
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
      this.setState({errors : errors})
      console.log(errors);
  }
    validate = (name, value) => {
        let err = {};
        switch(name) {
            case "firstname":
                if(value.length < 3) {
                    err.firstname = "minimum of 3 characters";
                }
                if(value.length > 20) {
                    err.firstname = "maximum of 20 characters";
                }
                return err;
            break;
            case "lastname":
                if(value.length < 3) {
                    err.lastname = "minimum of 3 characters";
                }

                if(value.length > 20) {
                    err.lastname = "maximum of 20 characters";
                }
                return err;
            break;
            case "email":
                if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    err.email = "please provide valid email";
                }
                return err;
            break;
            case "password":
                if(value.length < 6) {
                    err.password = "minimum 6 characters";
                }
                return err;
            break;
            case "repassword":
                if(this.props.password !== value) {
                    err.repassword = "passwords doesn't match";
                }
                return err;
            break;
            default:
                return err;
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