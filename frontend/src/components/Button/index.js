import "./Button.css";

const Button = (props) => {
    return (
        <>
            <button onClick={props.click} type={props.type}>{props.title}</button>
        </>
    )
}

Button.defaultProps = {
    type: "button"
}

export default Button;