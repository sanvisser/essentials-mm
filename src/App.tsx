import React from "react";

import "./App.css";
import LoginPage from "./pages/login";
import AdminPage from "./pages/admin";
import HomePage from "./pages/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Firebase, { FirebaseContext } from "./components/firebase";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <FirebaseContext.Consumer>
            {(firebase: Firebase) => <LoginPage firebase={firebase} />}
          </FirebaseContext.Consumer>
        </Route>
        <Route path="/admin">
          <AdminPage />
        </Route>
        <Route path="/">
          <FirebaseContext.Consumer>
            {(firebase: Firebase) => <HomePage firebase={firebase} />}
          </FirebaseContext.Consumer>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
