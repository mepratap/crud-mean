let JWTStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;

let UserModel = require('../models/userModel');
let config = require('../config/database');

module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;

    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload);
        UserModel.getUserById(jwt_payload._doc._id, (err, user) => {
            if (err) {
                return done(err, false);
            } else if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}