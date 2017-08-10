// wire up auth for traditional login
import passport from 'passport';
const requireLogin = passport.authenticate('local', {session: false});
export default requireLogin;
