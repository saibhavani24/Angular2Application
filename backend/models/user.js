const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');
const UserSchema = new Schema({
    
    name: {type: String},
    lastname: {type: String},
    password: { type: String },
    country: { type: String },
    gender: { type: String},
    about: { type: String}
});

// Pre-save of user's hash password to database
UserSchema.pre('save', function(next) {
    const users = this,
        SALT_FACTOR = 5;

    if (!users.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(users.password, salt, null, (err, hash) => {
            if (err) return next(err);
            users.password = hash;
            next();
        });
    });
});

// Method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return cb(err); }

        cb(null, isMatch);
    });
};

module.exports = mongoose.model('users', UserSchema, 'users');