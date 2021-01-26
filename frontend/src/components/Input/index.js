import "./Input.css";

const Input = (props) => {
    return (
        <>
            <div className="form-control">
                <label htmlFor={props.label}>{props.label}</label>
                <input className={(props.error) ? "error-input" : ""} ref={props.validate} name={props.name} type={props.type}></input>
            </div>
        </>
    )
}

Input.defaultProps = {
    error: false,
    label: "",
    name: "",
    type: ""
}

export default Input;