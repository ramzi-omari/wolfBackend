import passport from 'passport';
import { UNAUTHORIZED_ACCEESS_ML_MESSAGE } from '../config/constants';

export default (req, res, next) => {
  passport.authenticate(['jwt', 'jwt_admin'], function (err, user, info) {
    if (err) return next(err);
    if (!user) return res.status(401).json({ success: false, message: UNAUTHORIZED_ACCEESS_ML_MESSAGE });
    if (user.admin) {
      req.admin = user;
    }
    else {
      req.user = user;
    }
    next();
  })(req, res, next);
};
