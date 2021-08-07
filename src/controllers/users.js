import * as _ from 'lodash';
import { TYPE_USERS } from '../config/constants';
import User from '../models/users';

/// @route user/
/// @desc get all users of the system
/// @access ADMIN
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();

    if (users) {
      return res.status(200).json({ users: usersEdited });
    }
    else {
      return [];
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

/// @route user/:id
/// @desc get a user by id
/// @access ADMIN
export const getUserById = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).res({ success: false, message: 'id is required' });
  try {
    const user = await User.findById(id);
    user.hashPassword = undefined;
    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(400).json({ success: false, message: 'error getting the user' });
  }
};

/// @route user/
/// @desc POST create a new user
/// @access ADMIN
export const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const user = await newUser.save();
    if (req.file) {
      user.profilePictureUrl = req.file.path;
    }
    user.hashPassword = undefined;
    return res.status(201).json({ success: true, user });
  } catch (error) {
    return res.status(400).send({ success: false, message: error });
  }
};

/// @route GET user/:id
/// @desc get the profile
/// @access USER
export const getProfile = async (req, res) => {
  // TODO : use the id from token
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    user.password = undefined; // hide sensitive data
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'user not found' });
  }
};

/// @route user/
/// @desc POST create a new user
/// @access ADMIN
export const editProfile = async (req, res) => {
  const profile = req.body;
  if (!profile || !profile.email)
    return res.status(400).json({ success: false, message: 'profile undefined' });
  console.log(profile);
  try {
    const user = await User.findOne({ email: profile.email });
    // update user
    user.first_name = profile.first_name || user.first_name;
    user.last_name = profile.last_name || user.last_name;
    user.birthDate = profile.birthDate || user.birthDate;
    user.phone = profile.phone || user.phone;
    user.city = profile.city || user.city;
    user.description = profile.description || user.description;
    //user.profilePictureUrl = profile.profilePictureUrl || user.profilePictureUrl;
    user.password = profile.password || user.password;
    const savedUser = await user.save();
    savedUser.password = undefined;
    return res.status(200).json({ success: true, user: savedUser });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

/// @route user/validate
/// @desc PUT vaidate or nvalidate a user 
/// @access ADMIN
export const validateUser = async (req, res, next) => {
  try {
    const { valid, id } = req.body;

    if (!id && !valid) return res.status(400).json({ success: false, message: "bodies fields are required!!" });
    const user = await User.findOne({ _id: id });

    if (!user) return res.status(400).json({ success: false, message: "user not exist!!" });
    if (user.isValid === valid) return res.status(418).json({ success: false, message: valid ? `user is already valid` : `user is already invalid` });
    //save
    user.isValid = valid;
    await user.save();

    return res.status(200).json({ success: true, message: valid ? `user turn to valid user` : `user turn to invalid user` });
  } catch (error) {
    console.log("error when validateUser =>" + error);
    return res.status(500).json({ success: false, message: error });
  }
}

/// @route user/
/// @desc put create a new user
/// @access USER
export const editProfileUser = async (req, res) => {
  try {
    const profile = req.body;

    if (!profile)
      return res.status(400).json({ success: false, message: 'profile undefined' });

    const user = await User.findOne({ _id: req.user._id });
    // update user
    user.first_name = profile.first_name || user.first_name;
    user.last_name = profile.last_name || user.last_name;
    user.birthDate = profile.birthDate || user.birthDate;
    user.phone = profile.phone || user.phone;
    user.city = profile.city || user.city;
    user.description = profile.description || user.description;
    //user.profilePictureUrl = profile.profilePictureUrl || user.profilePictureUrl;
    user.password = profile.password || user.password;

    const savedUser = await user.save();

    savedUser.password = undefined;

    return res.status(200).json({ success: true, user: savedUser });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
};

/// @route user/
/// @desc get a user by id
/// @access USER
export const getMyProfile = async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    user.password = undefined;
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'error getting the user' });
  }
};

/// @route user/type/:type
/// @desc get a user by type
/// @access USER
export const getUsersByType = async (req, res) => {
  try {
    const type = req.params.type;
    if(!TYPE_USERS.includes(type)){
      return res.status(418).json({
        status: false,
        message: "user type error"
      })
    }
    const users = await User.find({ type });
    const userResponse = users.map((user) => {
      user.password = undefined;
      return user;
    })
    return res.status(200).json({ success: true, users: userResponse });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'error getting the user' });
  }
};