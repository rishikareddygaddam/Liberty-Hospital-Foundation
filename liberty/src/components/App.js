import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Auth";
import Home from "./Home";
import About from "./Public/About";
import Grant from "./Grant";
import GrantList from "./Grant/List";
import GrantStatus from "./Grant/Status";
import Signup from "./Auth/Signup";
import Scholarship from "./Scholarship";
import ScholarshipList from "./Scholarship/List";
import ScholarshipStatus from "./Scholarship/Status";
import Program from "./Program";
import PatientAssistance from "./Program/PatientAssistance";
import Gift from "./Program/Gift";
import Family from "./Program/Family";
import PrivateRoute from "./helpers/PrivateRoute";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import Approval from "./Auth/Approval";
import EmployeeApproval from "./Auth/EmployeeApproval";

export default function App() {
  const key = +new Date();
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signup/employee" component={Signup} />
          <Route exact path="/approval" component={Approval} />
          <PrivateRoute
            exact
            path="/employee-approval"
            component={EmployeeApproval}
          />
          <Route exact path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/forgot" component={ForgotPassword} />
          <Route path="/reset/:token" component={ResetPassword} />
          <PrivateRoute
            path="/grant/applications"
            component={GrantList}
            exact
          />
          <PrivateRoute path="/grant/status" component={GrantStatus} exact />
          <PrivateRoute path="/grant" key="/grant" component={Grant} exact />
          <PrivateRoute
            path="/grant/:id"
            key="/grant/:id"
            component={Grant}
            exact
          />
          <PrivateRoute
            path="/scholarship"
            key="/scholarship"
            component={Scholarship}
            exact
          />
          <PrivateRoute
            path="/scholarship/applications"
            component={ScholarshipList}
          />
          <PrivateRoute
            path="/scholarship/status"
            component={ScholarshipStatus}
          />
          <PrivateRoute
            path="/scholarship/:id"
            key="/scholarship/:id"
            component={Scholarship}
            exact
          />
          <PrivateRoute path="/programs" component={Program} exact />
          <PrivateRoute path="/grant/applications" component={GrantList} />
          <PrivateRoute
            path="/programs/assistance"
            component={PatientAssistance}
            exact
          />
          <PrivateRoute path="/programs/gift" component={Gift} exact />
          <PrivateRoute path="/programs/family" component={Family} exact />
        </Switch>
      </Router>
    </div>
  );
}
