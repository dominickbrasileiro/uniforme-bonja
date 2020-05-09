import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SuccessMessage from './pages/SuccessMessage';
import ErrorMessage from './pages/ErrorMessage';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterTimer from './pages/RegisterTimer';
import RecoverPin from './pages/RecoverPin';
import RecoverPinTimer from './pages/RecoverPinTimer';
import Home from './pages/Home';
import ConfirmDemandCancel from './pages/ConfirmDemandCancel';
import NewDemand from './pages/NewDemand';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/success" component={SuccessMessage} />
        <Route path="/error" component={ErrorMessage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/r_timer" component={RegisterTimer} />
        <Route path="/forgot_pin" component={RecoverPin} />
        <Route path="/f_timer" component={RecoverPinTimer} />
        <Route path="/" exact component={Home} />
        <Route path="/demands/cancel" component={ConfirmDemandCancel} />
        <Route path="/demands/new" component={NewDemand} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
