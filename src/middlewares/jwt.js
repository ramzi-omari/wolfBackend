import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/users';
import { JWT_SECRET, JWT_SECRET_ADMIN } from '../config';
import Admin from '../models/admin';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};
const admin_opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_ADMIN,
};

export default passport => {
  passport.use('jwt',
    new Strategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id).then(user => {
        if (user) {
          const _user = user;
          _user.password = undefined;
          return done(null, _user);
        }
        return done(null, false);
      }).catch(err => {
        return done(err, false, { message: 'Server error' });
      });
    })
  )
  passport.use('jwt_admin',
    new Strategy(admin_opts, (jwt_payload, done) => {
      Admin.findById(jwt_payload.id).then(user => {
        if (user) {
          const _user = user;
          _user.password = undefined;
          _user.admin = true;
          return done(null, _user);
        }
        return done(null, false);
      }).catch(err => {
        return done(err, false, { message: 'Server error' });
      });
    })
  )
};
