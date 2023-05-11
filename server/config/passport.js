const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user-model");

module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = process.env.PASSPORT_SECRET;

    passport.use(
        new JwtStrategy(opts, function (jwt_payload, done) {
            console.log("jwt_payload: \n" + JSON.stringify(jwt_payload));
        })
)   
} 
