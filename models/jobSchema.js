import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide job title"],
        minLength:[3,'Job title must contain atleast 3 characters!'],
        maxLength:[25,'job title cannot exceed 25 characters!']
    },
    description:{
        type:String,
        required:[true,"Please provide job description!"],
        minLength:[20,'Job Description must contain atleast 50 letters!'],
        maxLength:[1500,'job Description cannot exceed 1500 letters!']
    },
    category:{
        type:String,
        required:[true,"Job category is required!"],
    },
    country:{
        type:String,
        required:[true,"Country is required!"],
    },
    city:{
        type:String,
        required:[true,"City is required!"],
    },
    location:{
        type:String,
        required:[true,"Please provide exact location!"],
        minLength:[15,"Job location must contain 30 letters!"]
    },
    fixedSalary:{
        type:Number,
        minLength:[4,"Fixed salary must contain atleast 4 characters!"],
        maxLength:[9,"Fixed salary cannot exceed 9 characters!"]
    },
    salaryFrom:{
        type:Number,
        minLength:[4,"Salary from must contain atleast 4 characters!"],
        maxLength:[9,"Salary to cannot exceed 9 characters!"]
    },
    salaryTo:{
        type:Number,
        minLength:[4,"Fixed salary must contain atleast 4 characters!"],
        maxLength:[9,"Fixed salary cannot exceed 9 characters!"]
    },
    expired:{
        type:Boolean,
        default:false,
    },
    jobPostedOn:{
        type:Date,
        default:Date.now()
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    }
})

export const Job = mongoose.model("Job",jobSchema);