import React from 'react';
import './Registration.css';
import AuthService from '../../services/AuthService';

class Login extends React.Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }
    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Registration</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input
                            className="form-item"
                            placeholder="Name goes here..."
                            name="name"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Surname goes here..."
                            name="surname"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Username goes here..."
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-submit"
                            value="REGISTER"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        );
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit(e){
        console.log("click Login")
        e.preventDefault();
        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
                console.log(res);
               this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
    }

    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }
}

export default Login;