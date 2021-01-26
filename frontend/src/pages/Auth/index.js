import { Component } from "react";
import LoginForm from "./components/LoginForm";
import "./Auth.css";

class Auth extends Component {
    render(){
        return (
            <div id="auth">
                <LoginForm/>
            </div>
        )
    }
}

export default Auth;