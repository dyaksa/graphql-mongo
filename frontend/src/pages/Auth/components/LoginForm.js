import "./LoginForm.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { LOGIN_REQUESTED, REGISTER_REQUESTED } from "../../../redux/actions/Auth";

const LoginForm = (props) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();
    const [isLogin,setIsLogin] = useState(false);

    const switchHandler = () => setIsLogin(!isLogin);

    const onSubmit = (data) => {
        const { email,password } = data;
        if(!isLogin){
            dispatch({type: REGISTER_REQUESTED, payload: {email,password}});
        } else{
            dispatch({type: LOGIN_REQUESTED,payload: {email,password}});
        }
    }

    return (
        <form className="form-auth" onSubmit={handleSubmit(onSubmit)}>
            <Input error={(errors.email) ? true : false} validate={register({required: true})} name="email" label="Email Address" type="email"/>
            <Input error={(errors.password) ? true : false} validate={register({required: true})} name="password" label="Password" type="password"/>
            <div className="form-actions">
                <Button type="submit" title="Submit"/>
                <Button click={switchHandler} type="button" title={(!isLogin) ? 'Switch to Login' : 'Switch to Signup'}/>
            </div>
        </form>
    )
}


export default LoginForm;