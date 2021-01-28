import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import MainNavigation from "./components/Navigation/MainNavigation";
import { Provider } from "react-redux";
import routes from "./routes";
import store from "./redux/store";
import './App.css';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Router>
        <>
        <MainNavigation/>
        <main className="main-content">
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
      </Provider>
    </div>
  );
}

export default App;
