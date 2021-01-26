import { Component } from "react";
import "./Auth.css";

class Auth extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: null,
            password: null
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    render(){
        return (
            <form className="form-auth" onSubmit={this.submitHandler}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => this.setState({email: e.target.value}) } type="email" id="email"></input>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => this.setState({password: e.target.value})} type="password" id="password"></input>
                </div>
                <div className="form-actions">
                    <button type="submit">Submit</button>
                    <button type="button">Switch to Signup</button>
                </div>
            </form>
        )
    }
}

export default Auth;