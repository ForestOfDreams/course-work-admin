import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CoursesPage from "./Pages/CoursesPage";
import OrganizationPage from "./Pages/OrganizationPage";

import Context from "./context";

import Header from "./Components/Header";
import UsersPage from "./Pages/UsersPage";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Context.Provider value={{ isLogin, setIsLogin }}>
      <div>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/users" component={UsersPage} />
            <Route exact path="/courses" component={CoursesPage} />
            <Route exact path="/organizations" component={OrganizationPage} />
          </Switch>
        </Router>
      </div>
    </Context.Provider>
  );
};

export default App;
