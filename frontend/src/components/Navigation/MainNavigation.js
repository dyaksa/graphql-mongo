import { NavLink } from "react-router-dom";
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
                    <li>
                        {!isEmpty(data) && data.data.login.token 
                        ? (<button onClick={handleClick}>Logout</button>) 
                        : (<NavLink to="/auth">Auth</NavLink>)}
                    </li>
                    <li><NavLink to="/bookings">Bookings</NavLink></li>
                    <li><NavLink to="/events">Events</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;