import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import routes from "./routes";
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
