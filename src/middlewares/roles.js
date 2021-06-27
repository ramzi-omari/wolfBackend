// import User from './../models/users.model';
import Admin from '../models/admin';

export default (req, res, next) => {
  const user = req.admin;
  if (!user) return res.status(401).json({ success: false, message: 'Unauthorized user' });
  Admin.findById(user._id).then((_user, err) => {
    if (err) return res.status(400).json({ success: false, message: err });
    // if (_user && _user.permissionLevel === ADMIN) {
    if (_user) {
      next();
      return;
    }
    return res.status(400).json({ success: false, message: 'Protected route' });
  }).catch((err) => { console.warn(err); return res.status(500).json({ success: false, message: 'Server error' }) });
}

