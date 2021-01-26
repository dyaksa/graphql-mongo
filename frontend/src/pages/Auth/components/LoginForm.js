import "./LoginForm.css";
import { useForm } from "react-hook-form";
import Input from "../../../components/Input";

const LoginForm = (props) => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <form className="form-auth" onSubmit={handleSubmit(onSubmit)}>
            <Input error={(errors.email) ? true : false} validate={register({required: true})} name="email" label="Email Address" type="email"/>
            <Input error={(errors.password) ? true : false} validate={register({required: true})} name="password" label="Password" type="password"/>
            <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button">Switch to Signup</button>
            </div>
        </form>
    )
}

export default LoginForm;