import passport from 'passport'
export requireAuth = passport.authenticate('jwt', {session: false});
