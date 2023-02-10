//import express

const express = require('express');

//import cors

const cors = require('cors');

//import dataService

const dataServices = require('./dataService/dataService')

//create a app using express

const app = express();

//use json parser for server response

app.use(express.json())

//using cors specify the origin to the server

app.use(cors({
    origin:'http://localhost:4200'
}))


app.listen(3000,()=>{
    console.log('Listening to port 3000')
})

// //Application specific middleware

// const appMiddleware = (req, res, next) => {
//     console.log('Application specific middleware')
//     next();
// }




// const jwtRouterMiddleware = (req, res, next) => {
//     try{
//         console.log('Router specific middleware');
//         const token = req.headers['x-access-token']
//         const data = jwt.verify(token, 'course777')
//         console.log(data);
//         next();
//     }
//     catch{
//         res.status(422).json({
//             statusCode:422,
//             status:false,
//             msg:'Please login to continue'}

//         )
//     }
// }

// app.use(appMiddleware)



app.get('/allcourses',(req,res)=>{
    dataServices.getCourses().then(
        result=>{
            res.status(result.statusCode).json(result);
        }
    )
})

//REGISTER

app.post('/register', (req, res) => {
    dataServices.register(req.body.username,req.body.email, req.body.password).then(
      result=>{
          res.status(result.statusCode).json(result);
      }
    )
    
})

//LOGIN

app.post('/login', (req, res) => {
    dataServices.login(req.body.email, req.body.password).then(
        result=>{
            res.status(result.statusCode).json(result);
        }
    )
})



app.post('/addcourse', (req, res) => {
    dataServices.addCourse(req.body.email,req.body.id,req.body.title,req.body.image, req.body.desc).then(
      result=>{
          res.status(result.statusCode).json(result);
      }
    )
    
})

app.post('/mycourse',(req, res) => {
    dataServices.myCourse(req.body.userid).then(
       result=>{
           res.status(result.statusCode).json(result);
       }
    )
})

app.post('/deletecourse',(req,res)=>{
    dataServices.deleteCourse(req.body.userid,req.body.courseid).then(
        result=>{
            res.status(result.statusCode).json(result);
        }
    )
})

app.patch('/updateuser',(req,res)=>{
    dataServices.updateUser(req.body.userid,req.body.username,req.body.email,req.body.password).then(
        result=>{
            res.status(result.statusCode).json(result);
        }
    )
})

app.post('/getuser',(req, res) => {
    dataServices.getUser(req.body.userid).then(
       result=>{
           res.status(result.statusCode).json(result);
       }
    )
})