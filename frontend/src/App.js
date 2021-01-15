import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import MainNavigation from "./components/Navigation/MainNavigation";
import routes from "./routes";
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <>
        <MainNavigation/>
        <main>
          <Switch>
            <Redirect from="/" to="/auth" exact={true}/>
            {routes.map((val,key) => (
              <Route
                path={val.route} 
                exact={val.isExact}
                key={key}
                component={val.component}
              />
            ))}
          </Switch>
        </main>
        </>
      </Router>
    </div>
  );
}

export default App;
