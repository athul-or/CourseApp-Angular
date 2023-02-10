//import mongoose

const mongoose = require('mongoose');

//define connection string

mongoose.connect('mongodb://localhost:27017/Education',()=>{
    console.log('Database Connected')
})


const Course  = mongoose.model('Course',{
    //schema
    id:Number,
    title:String,
    desc:String,
    image:String,
    duration:String,
    onlinefee:String,
    offlinefee:String,
    syllabus:String,
    batch:{
        cochin:String,
        banglore:String
    }
})

const User = mongoose.model('User',{//model creation
    //schema
    email:String,
    username:String,
    password:String,
    courses:[]
})

module.exports = {
    Course,User
}