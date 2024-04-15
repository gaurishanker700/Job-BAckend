import mongoose from "mongoose";
import validator from "validator";
const applicationSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your full name"],
        minLength:[3,"name  must be at least 3 characters"],
        maxLength:[60,"name not must be at least 60 characters"],

    },
    email:{
        type: String,
          validator:[validator.isEmail,'Invalid Email.'],
          required: [true ,'Please Provide an Email'],
    },
    coverLetter:{
        type : String,
        required: [true,"Please provide a Cover Letter"],
    },
    phone:{
        type:Number,
        required: [true,"Please provide a Phone Number "],
    },
    address:{
        type:String,
        required: [true,"Please provide an Address"],

    },
    resume:{
        public_id:{
            type:String,
            required: [true,"Resume is Required"],

        },
        url:{
            type:String,
            required:true,
        }
    },
    applicantID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        
        },
        role:{
            type:String,
            enum:["job seeker"],
            required:true
        }
    },
    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        
        },
        role:{
            type:String,
            enum:["employer"],
            required:true
        }

    }


});
export const  Application = mongoose.model("Application",applicationSchema);