const { Router } = require('express');
const Brute = require('express-brute');
const BruteRedis = require('express-brute-redis');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const DemandController = require('./app/controllers/DemandController');
const ProfileController = require('./app/controllers/ProfileController');
const CheckoutController = require('./app/controllers/CheckoutController');
const BoletoController = require('./app/controllers/BoletoController');
const RecoverPin = require('./app/services/RecoverPin');
const Postback = require('./app/services/Postback');

const UserValidator = require('./app/validators/UserValidator');
const SessionValidator = require('./app/validators/SessionValidator');
const DemandValidator = require('./app/validators/DemandValidator');
const CheckoutValidator = require('./app/validators/CheckoutValidator');
const RecoverPinValidator = require('./app/validators/RecoverPinValidator');

const authMiddleware = require('./app/middlewares/auth');

const routes = Router();

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore, {
  failCallback: (req, res) => {
    res.status(429).json({ error: 'Too many requests, please try again later.' });
  },
});

routes.post('/checkout/postback', Postback);

routes.post('/users', UserValidator.store, UserController.store);
routes.post('/sessions', bruteForce.prevent, SessionValidator.store, SessionController.store);
routes.post('/recover_pin/:enrollment', RecoverPinValidator, RecoverPin);

routes.use(authMiddleware);

routes.post('/demands', DemandValidator.store, DemandController.store);
routes.delete('/demands/:id', DemandController.delete);

routes.get('/user/demands', ProfileController.index);

routes.post('/demands/checkout/:id', CheckoutValidator.store, CheckoutController.store);

routes.get('/boletos/', BoletoController.index);
routes.get('/boletos/:demand_id', BoletoController.show);

module.exports = routes;
