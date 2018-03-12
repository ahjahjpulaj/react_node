import React from 'react';
// import AuthService from z'../../services/AuthService';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    login
} from '../../actions/auth';
import { 
    handleInputChange
} from '../../actions/helpers';


class Login extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        // this.Auth = () => new AuthService();
    }
    render() {
        console.log(this.props)
        if(this.props.authenticated){
            return <Redirect to='/'/>;
        }
        else{
            return (
                <div className="center">
                    <div className="card">
                        <h1>Login</h1>
                        <form onSubmit={this.handleFormSubmit}>
                            <input
                                className="form-item"
                                placeholder="Username goes here..."
                                name="username"
                                type="text"
                                onChange={(e)=>this.handleChange(e)}
                            />
                            <input
                                className="form-item"
                                placeholder="Password goes here..."
                                name="password"
                                type="password"
                                onChange={(e)=>this.handleChange(e)}
                            />
                            <input
                                className="form-submit"
                                value="SUBMIT"
                                type="submit"
                            />
                        </form>
                        <div className="register-container">
                            <Link to="/register" className="register-button">Register</Link>
                        </div>
                    </div>
                </div>
            );
        }
    }

    handleChange(e){
        this.props.handleInputChange(e.target.name, e.target.value);
    }

    handleFormSubmit(e){
        e.preventDefault();
        this.props.login({username : this.props.username ,password: this.props.password}, this.props.history);
    }

    componentWillMount(){
        // if(this.Auth.loggedIn())
        //     this.props.history.replace('/');
    }
}


const mapStateToProps = (state) => ({
    username: state.helper.username,
    password: state.helper.password,
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
  });
  
  
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
    handleInputChange,
    login,
}, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);