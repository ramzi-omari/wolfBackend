import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Token from './token';
import crypto from "crypto";
import { JWT_SECRET } from '../config';
import { TYPE_USERS } from '../config/constants';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: String,
  profilePictureUrl: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  birthDate: Date,
  address: String,
  city: Number,
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  isDeleted: {
    type :Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 5,
    min: 0,
    max: 5
  },
  description: String,
  tag: [String],
  type: {
    type: String,
    enum: TYPE_USERS,
    required
  }

}, {
  collection: 'Users',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    })
  })
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 20160); // 2 weeks
  let payload = {
    id: this._id,
    email: this.email,
    firstName: this.firstName,
  };
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};

UserSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
}

UserSchema.methods.generateVerificationToken = function () {
  let payload = {
    userId: this._id,
    token: crypto.randomBytes(20).toString('hex')
  };
  return new Token(payload);
};

const User = mongoose.model('Users', UserSchema);

export default User;
