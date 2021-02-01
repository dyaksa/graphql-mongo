import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../redux/actions/Auth"
import { isEmpty } from "lodash";
import "./MainNavigation.css";

const MainNavigation = (props) => {
    const dispatch = useDispatch();
    const { data } = useSelector((s) => s.Auth);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch({type: LOGOUT});
    }

    return (
        <header className="main-navigation">
            <div className="main-navigation__logo">
                <h1>Evently</h1>
            </div>
            <nav className="main-navigation__item">
                <ul>
                    {(isEmpty(data)) && (<li>
                        <NavLink to="/auth">Auth</NavLink>
                    </li>) }
                    <li>
                        <NavLink to="/events">Events</NavLink>
                    </li>
                    {(!isEmpty(data) && data.data.login.token) 
                    ? (
                    <>
                        <li>
                            <NavLink to="/bookings">Bookings</NavLink>
                        </li>
                        <li>
                            <button className="btn" onClick={handleClick}>Logout</button>
                        </li>
                    </>) 
                    : <Redirect to="/auth"/>}
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;