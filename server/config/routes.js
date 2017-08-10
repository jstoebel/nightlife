import express from 'express';
const controllers = require('require.all')('../controllers');
require('./passport');  // need to run passport config

// Middleware to require login/auth
// eslint-disable-next-line 
import requireAuth from './auth/jwt'
import requireLogin from './auth/local';

// eslint-disable-next-line new-cap
const masterRouter = express.Router();

// api routes
// eslint-disable-next-line new-cap
const apiRouter = express.Router();
apiRouter.post('/auth/register', controllers.authentication.register);
apiRouter.post('/auth/login', requireLogin, controllers.authentication.login);
apiRouter.get('/auth/protected', requireAuth, controllers.authentication.checkToken);

// feature routes
apiRouter.get('/bars/search/:location', controllers.bars.search);
apiRouter.post('/bars/rsvp/', requireAuth, controllers.bars.rsvp);
apiRouter.get('/bars/rsvps', requireAuth, controllers.bars.getRSVPs);

// put it all together
masterRouter.use('/api', apiRouter);
masterRouter.all('/*', controllers.home.index);
export default masterRouter;
