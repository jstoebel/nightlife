import passport from 'passport'
export requireLogin = passport.authenticate('local', {session: false});
