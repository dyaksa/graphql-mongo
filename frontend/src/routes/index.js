import { Auth, Bookings, Events } from "../pages";
import { Route } from "react-router-dom";

const Routes = () => {
    const routes = [
        {
            name: "Auth",
            route: "/auth",
            component: (props) => <Auth {...props}/>,
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