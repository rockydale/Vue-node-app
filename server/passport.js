const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model("users")
const keys = require('../server/dbs/config')


// const opts = {}
// opts.JwtStrategy = ExtractJwt.fromAuthHeaderAsBearerToken()
// opts.secretOrKey = 'secret'
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret'
// opts.secretOrkey = keys.secretOrKey
module.exports = passport =>{
    console.log(opts.secretOrkey)
    //在server.js 传递了passport参数
    passport.use(new JwtStrategy(opts , (jwt_payload , done)=>{
        console.log('验证通过',jwt_payload)
        User.findById(jwt_payload.id)
            .then(user=>{
                if(user){
                    return done(null,user)
                }
                return done(null,false)
            })
            .catch(err=>{
                console.log(err)
            })
    }))
}