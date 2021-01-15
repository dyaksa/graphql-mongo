import { Auth, Bookings, Events } from "../pages";

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

export default routes;