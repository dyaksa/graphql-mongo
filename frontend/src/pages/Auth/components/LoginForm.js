import "./LoginForm.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { postAuthLogin } from "../../../redux/actions/Auth";

const LoginForm = (props) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();
    const [isLogin,setIsLogin] = useState(false);

    const switchHandler = () => setIsLogin(!isLogin);

    const onSubmit = (data) => {
        const { email,password } = data;
        let requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}"){
                        _id
                        token
                        expiredIn
                    }
                }`
            }
        if(!isLogin){
            requestBody = {
                query: `
                    mutation {
                        createUser(userInput: {email: "${email}", password: "${password}"}){
                            _id
                            email
                            password
                        }
                    }`
                }
            }
            dispatch(postAuthLogin(requestBody));
        // fetch('http://localhost:8000/graphql',{
        //     method: "POST",
        //     body: JSON.stringify(requestBody),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(res => {
        //     return res.json();
        // }).then(resBody => {
        //     console.log(resBody);
        // }).catch(err => {
        //     console.log(err)
        // })
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