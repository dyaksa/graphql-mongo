import { Auth, Bookings, Events } from "../pages";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import _ from "lodash";

const Routes = () => {
    const { data } = useSelector((s) => s.Auth);

    const routes = [
        {
            name: "Auth",
            route: "/auth",
            component: (props) => (!_.isEmpty(data) && data.data.login.token) ? <Redirect to="/events"/> : <Auth {...props}/>,
            isExact: false
        },
        {
            name: "Bookings",
            route: "/bookings",
            component: (props) => <Bookings {...props}/>,
            isExact: false
        },
        {
            name: "Events",
            route: "/events",
            component: (props) => <Events {...props}/>,
            isExact: false
        }
    ]

    return (
        <>
        {routes.map((val,key) => (
            <Route
            path={val.route} 
            exact={val.isExact}
            key={key}
            component={val.component}
            />
        ))}
        </>
    )
}



export default Routes;