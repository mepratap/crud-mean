const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        validate: {
            validator: (email, callback) => {
                UserModel.find({email: email}, ( err, details) => {
                    callback(details.length === 0);
                });
            },
            message: 'Email already Exists!'
        }
    },
    username: {
        required: true,
        type: String,
        validate: {
            validator: (username, callback) => {
                UserModel.find({username: username}, (err, details) => {
                    callback(details.length === 0);
                });
            },
            message: 'Username already exists!'
        }
    },
    password: {
        required: true,
        type: String
    }
});

const UserModel = module.exports = mongoose.model('Users', UserSchema);

module.exports.getUserById = (id, callback) => {
    UserModel.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
    UserModel.findOne({username: username}, callback);
}

module.exports.addUser = (user, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            user.save(callback);
        });
    });
}

module.exports.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, match) => {
        if (err) throw err;
        callback(null, match);
    })
}