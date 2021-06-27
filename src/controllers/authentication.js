import Users from '../models/users';

/// @route auth/signup
/// @desc register new user
/// @access public
const signUp = async (req, res) => {
  try {
    const { email } = req.body;
    // check if account exist
    const user = await Users.findOne({ email });
    if (user) return res.status(401).json({ success: false, message: 'email already exists' });
    const newUser = new Users({ ...req.body });
    const savedUser = await newUser.save();
    savedUser.password = undefined;
    
    res.status(201).json({ success: true, user: savedUser });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/// @route auth/signIn
/// @desc login user using email/password
/// @access public
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    console.log(user);
    if (!user) return res.status(401).json({ success: false, message: 'email not registered yet' });
    if (!user.comparePassword(password)) return res.status(401).json({
      success: false,
      message: 'invalid credentials'
    });
    //login success
    user.password = undefined;
    res.status(200).json({ success: true, token: user.generateJWT(), user });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};



export {
  signIn,
  signUp,
};
