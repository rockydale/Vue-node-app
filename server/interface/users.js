// @login & register
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const keys = require('../dbs/config')
const passport = require('passport')

const User = require('../dbs/models/User')

//@desc 注册接口
router.post("/register", (req, res) => {
    //查询数据库中是否拥有邮箱
    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                //邮箱已被注册
                return res.status(400).json("邮箱已被注册!")
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    identity: req.body.identity
                })

                //进行密码加密 使用brcypt的genSalt方法
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err

                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                        //返回保存的user对象
                    })
                })
            }
        })

})


//@desc 登录接口 返回token jwt passport
router.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    //查询数据库
    User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                return res.status(404).json("用户不存在")
            }

            //密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //匹配成功
                        //规则 加密名字 过期时间 回调函数
                        const rule = {
                            id: user._id,
                            name: user.name,
                            avatar: user.avatar,
                            identity: user.identity
                        }
                        jwt.sign(rule, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) throw err

                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        })

                    } else {
                        return res.status(400).json('密码错误')
                    }
                })
        })
})

//@desc 返回当前用户请求信息
//@access Private
//使用passport验证token
router.get("/current", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    })
})

module.exports = router