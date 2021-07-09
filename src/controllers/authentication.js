import { EMAIL_EXISTING_ML_MESSAGE, EMAIL_NOT_EXISTING_ML_MESSAGE, MISSING_REQUIRED_FIELDS } from '../config/constants';
import Users from '../models/users';

/// @route auth/signup
/// @desc register new user
/// @access public
const signUp = async (req, res) => {
  try {
    const { email, phone, first_name, last_name, type } = req.body;

    if (!email || !phone || !first_name || !last_name || !type) {
      console.log({
        success: false,
        message: MISSING_REQUIRED_FIELDS
      });

      return res.status(400).json({ success: false, message: "missing required fields" });
    }
    // check if account exist
    const user = await Users.findOne({ $or: [{ email }, { phone }] });
    if (user) return res.status(400).json({ success: false, message: EMAIL_EXISTING_ML_MESSAGE });
    const newUser = new Users({ ...req.body });
    const savedUser = await newUser.save();
    savedUser.password = undefined;

    res.status(200).json({ success: true, user: savedUser });
  } catch (e) {
    console.log({
      success: false,
      function: "signUp",
      e,
    });
    res.status(500).json({ success: false, message: "server ERROR!!" });
  }
};

/// @route auth/signIn
/// @desc login user using email/password
/// @access public
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) return res.status(401).json({ success: false, message: EMAIL_NOT_EXISTING_ML_MESSAGE });

    if (!user.comparePassword(password)) return res.status(401).json({
      success: false,
      message: 'invalid credentials'
    });
    //login success
    user.password = undefined;
    res.status(200).json({ success: true, token: user.generateJWT(), user });
  } catch (e) {
    console.log({
      success: false,
      function: "signIn",
      e,
    });
    res.status(500).json({ success: false, message: "server ERROR!!" });
  }
};



export {
  signIn,
  signUp,
};
