const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : [true , 'Name is required']
        },

        email : {
            type : String,
            required : [true , 'email is required'],
            unique   : true
        },
        password : {
            type : String,
            required : [true , 'password is required']
        },
        role : {
            type : String,
            enum : ['customer','worker'],
            default : 'customer'
        },
        workerProfile : {
            service : {type : String},
            hourlyRate : {type : Number},
            experience : {type : String},
            certificationURL : {type : String},
            isVerified : {type : Boolean, default : false},
            bio : {type : String, default : ''},
            profileImage : {type : String, default : ''},
            gallery : [{type : String}],
            rating: {type: Number, default: 0},
            ratingCount: {type: Number, default: 0}
        },
     } , { timestamps : true} )

module.exports = mongoose.model('User',userSchema)