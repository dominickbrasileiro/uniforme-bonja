const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const DemandController = require('./app/controllers/DemandController');
const ProfileController = require('./app/controllers/ProfileController');
const RecoverPin = require('./app/controllers/RecoverPin');

const UserValidator = require('./app/validators/UserValidator');
const SessionValidator = require('./app/validators/SessionValidator');
const DemandValidator = require('./app/validators/DemandValidator');
const RecoverPinValidator = require('./app/validators/RecoverPinValidator');

const authMiddleware = require('./app/middlewares/auth');

const routes = Router();

routes.post('/users', UserValidator.store, UserController.store);
routes.post('/sessions', SessionValidator.store, SessionController.store);
routes.post('/recover_pin/:enrollment', RecoverPinValidator, RecoverPin);

routes.use(authMiddleware);

routes.post('/demands', DemandValidator.store, DemandController.store);
routes.delete('/demands/:id', DemandController.delete);

routes.get('/user/demands', ProfileController.index);

module.exports = routes;
