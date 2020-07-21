import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import SuccessMessage from './pages/SuccessMessage';
import ErrorMessage from './pages/ErrorMessage';
import Login from './pages/Login';
import Instructions from './pages/Instructions';
import Register from './pages/Register';
import RegisterTimer from './pages/RegisterTimer';
import RecoverPin from './pages/RecoverPin';
import RecoverPinTimer from './pages/RecoverPinTimer';
import Home from './pages/Home';
import ConfirmDemandCancel from './pages/ConfirmDemandCancel';
import NewDemand from './pages/NewDemand';
import Checkout from './pages/Checkout';
import PaymentMethods from './pages/PaymentMethods';
import CreditCardCheckout from './pages/CreditCardCheckout';
import Boleto from './pages/Boleto';

function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/success" component={SuccessMessage} />
        <Route path="/error" component={ErrorMessage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/r_timer" component={RegisterTimer} />
        <Route path="/forgot_pin" component={RecoverPin} />
        <Route path="/f_timer" component={RecoverPinTimer} />
        <Route path="/" exact component={Home} />
        <Route path="/instructions" component={Instructions} />
        <Route path="/demands/cancel/:demandId" component={ConfirmDemandCancel} />
        <Route path="/demands/new" component={NewDemand} />
        <Route path="/checkout/:demandId" exact component={Checkout} />
        <Route path="/checkout/payment_methods/:demandId" component={PaymentMethods} />
        <Route path="/checkout/credit_card/:demandId" component={CreditCardCheckout} />
        <Route path="/boletos/:demandId" component={Boleto} />
      </Switch>
    </HashRouter>
  );
}

export default Routes;
