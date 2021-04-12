const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    type:{
        type:String
    },
    describe:{
        type:String
    },
    //收入
    income:{
        type:String,
        required:true
    },
    //支出
    expend:{
        type:String,
        required:true
    },
    cash:{
        type:String,
        required:true
    },
    remark:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Profile = mongoose.model("profile" , ProfileSchema)