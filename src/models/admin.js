import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Token from './token';
import crypto from "crypto";
import { JWT_SECRET_ADMIN } from '../config';

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name',
    },
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    collection: 'Admins',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

AdminSchema.pre('save', function (next) {
    const admin = this;
    if (!admin.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(admin.password, salt, function (err, hash) {
            if (err) return next(err);
            admin.password = hash;
            next();
        })
    })
});

AdminSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

AdminSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 20160); // 2 weeks
    let payload = {
        id: this._id,
        email: this.email,
        firstName: this.firstName,
    };
    return jwt.sign(payload, JWT_SECRET_ADMIN, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
    });
};

AdminSchema.methods.generatePasswordReset = function () {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
}

AdminSchema.methods.generateVerificationToken = function () {
    let payload = {
        adminId: this._id,
        token: crypto.randomBytes(20).toString('hex')
    };
    return new Token(payload);
};

const Admin = mongoose.model('Admins', AdminSchema);

export default Admin;
