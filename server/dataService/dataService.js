const db = require('./db')

//get all course details from db

const getCourses = () =>{
    return db.Course.find().then(
         (result)=>{
             if(result){
                 return{
                     status:true,
                     statusCode:200,
                     courses:result
                 }
             }
             else{
                 return{
                     status:false,
                     statusCode:401,
                     message:'Product not found'
                 }
             }
         }
     )
 }

 const register = (username,email,password) => {
    return db.User.findOne({ email }).then( //asynchronous call
        user => {
            if (user) {
                return {
                    status: false,
                    statusCode: 401,
                    msg: 'User already exists!'
                }
            }
            else {
                const newUser = new db.User({
                    username: username,
                    email: email,
                    password: password,
                    courses:[]
                })
                newUser.save()//to save to  mdb
                return {
                    status: true,
                    statusCode: 200,
                    msg: 'Register Successful'
                }
            }
        }
    )
}


const login = (email, password) => {
    return db.User.findOne({ email, password }).then(
        user => {
            if (user){
                return {
                    status: true,
                    statusCode: 200,
                    msg: 'Login Successful',
                    currentUser:user.username,
                    currentEmail:user.email,
                    currentPassword:user.password,
                    userId :user._id
                }
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    msg: 'Invalid user details'
                }
            }
        }
    )

}






 const addCourse = (email,id,title,image,desc) => {
    return db.User.findOne({ email }).then( //asynchronous call
        user => {
            if (user) {
                user.courses.push({
                    id:id,
                    title: title,
                    image:image,
                    desc:desc
                })
                user.save()//to save to  mdb
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Enrolled Successfully'
                }
            }
        }
    )
}


const myCourse = (userid) => {
    return db.User.findOne({userid}).then(
        user=>{
        if(user){
            return{
                status: true,
                statusCode: 200,
                mycourses: user.courses
            }
        }
        else{
            return{
                status: false,
                statusCode: 401,
                message: 'User not found'
            }  
        }
      }
)
}




 const updateUser = (userid,username,email,password) => {
    return db.User.findOneAndUpdate({id:userid},{$set:{username:username,email:email,password:password}}).then(
        user=>{
        if(user){
            return{
                status: true,
                statusCode: 200,
                message:'Updated Successfully'
            }
        }
        else{
            return{
                status: false,
                statusCode: 401,
                message: 'User not found'
            }  
        }
      }
)
}

const getUser = (userid) => {
    return db.User.findOne({userid}).then(
        user=>{
        if(user){
            return{
                status: true,
                statusCode: 200,
                user: user
            }
        }
        else{
            return{
                status: false,
                statusCode: 401,
                message: 'User not found'
            }  
        }
      }
)
}



const deleteCourse = (userid,courseid) => {
    return db.User.findOneAndUpdate({"id": userid}, {$pull: {"courses": {"id": courseid}}}).then( //asynchronous call
        user => {
            if (user) {
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Deleted Successfully'
                }
            }
              else{
                return {
                    status: false,
                    statusCode: 401,
                    message: 'Something went wrong!'
                }
            
            }
        }
    )
}


 module.exports = {
    getCourses,register,login,addCourse,myCourse,deleteCourse,updateUser,getUser
}