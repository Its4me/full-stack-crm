const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../modeles/User')
const keys = require('../config/keys')


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
}

module.exports = passport => {
  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.userId).select('email id')
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    } catch (e) {
      console.log(e);
    }
  }));
} 

