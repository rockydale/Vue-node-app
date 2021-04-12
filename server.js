//搭建本地服务器
const express = require('express')
//引入mongoose
const mongoose = require('mongoose')
const dbConfig  = require('./server/dbs/config') 
const passport = require('passport')
//接口部分
const bodyParser = require('body-parser')
const users = require('./server/interface/users')
const profiles = require('./server/interface/profiles')
const app = express()

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



//连接数据库
mongoose.connect(dbConfig.dbs, {
        useNewUrlParser: true
    }).then(() => {
        console.log('mongodb connected')
    }).catch(err => {
    console.log(err)
    })

//passport 初始化
app.use(passport.initialize())

require("./server/passport")(passport)

//配置routes
app.use("/api/users" ,users )
app.use("/api/profiles" , profiles)

//获取端口号
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

//然后node 这个js文件 就开启了本地服务器