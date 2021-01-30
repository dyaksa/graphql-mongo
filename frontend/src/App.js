import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import MainNavigation from "./components/Navigation/MainNavigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Routes from "./routes";
import { store, persistor } from "./redux/store";
import './App.css';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <>
            <MainNavigation/>
            <main className="main-content">
              <Switch>
                <Redirect from="/" to="/auth" exact={true}/>
                <Routes/>
              </Switch>
            </main>
            </>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
