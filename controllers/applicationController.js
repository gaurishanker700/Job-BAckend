import { catchAsyncErrors } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js"
import { Application } from "../model/applicationSchema.js";
import cloudinary from 'cloudinary'
import { Job } from "../model/jobSchema.js";

export const employerGetAllApplications= catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const{_id}=req.user;
    const applications=await Application.find({'employerID.user': _id})
    console.log(applications)
    res.status(200).json({
        success:true ,
        applications 
    })
    

 })


 export const jobseekerGetAllApplications= catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;

    if (role === "employer") {
      return next(
        new ErrorHandler("employer not allowed to access this resource.", 400)
      );
    }
    const{_id}=req.user
    const applications=await Application.find({'applicantID.user': _id})
    res.status(200).json({
        success:true ,
        applications 
    })
    

 })
 export const jobseekerDeleteApplication=catchAsyncErrors( async (req,res,next)=>{
  const { role } = req.user;
    if (role === "employer") {
      return next(
        new ErrorHandler("employer not allowed to access this resource.", 400)
      );
    }
    const {id}=req.params
    const application=await Application.findById(id);
    if(!application){
       return next(new ErrorHandler('No application found with that id',400))
   }
   await application.deleteOne()
   res.status(200).json({
    success: true,
    message:"Deleted the application"
   })
 })

 export const postApplication= catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
    if (role === "employer") {
      return next(
        new ErrorHandler("employer not allowed to access this resource.", 400)
      );
    }
    if(!req.files || Object.keys(req.files).length === 0){
      return next(new ErrorHandler("resume file required"))
    }
    const {resume}=req.files
   const allowedFormats=["image/png", "image/jpeg", "image/jpg","image/webp"]
   if (!allowedFormats.includes(resume.mimetype)){
    return next(new ErrorHandler("invalid file type, plz upload your resume in jpg OR png", 400));
   }
   const cloudinaryResponse= await cloudinary.uploader.upload(resume.tempFilePath)
   if(!cloudinaryResponse || cloudinaryResponse.error){
    console.error("cloudinary error",cloudinaryResponse.error|| "unknown error");
    return next(new ErrorHandler("Server Error while processing image",500));
   }
   const {name,email,coverLetter,phone,address,jobId}=req.body;
  //  const {}=req.body
   console.log(jobId)
   const applicantID={
    user:req.user._id,
    role:"job seeker"
   }
   if(!jobId){
    return next(new ErrorHandler("Job is not found",400))
   }
   const jobDetails= await Job.findById(jobId)
   if(!jobDetails){
    return next(new ErrorHandler("The Job you are applying for does not exist",404))
   }
   const employerID={
    user:jobDetails.postedBy,
    role:"employer"
   }
   if(!name|| !email || !coverLetter ||!phone || !address || !applicantID|| !employerID|| !resume ){
    return next(new ErrorHandler('Please fill all fields',400))

   }
   const application= await Application.create({
    name, email, phone, address, coverLetter,applicantID,employerID,resume:{
      public_id:cloudinaryResponse.public_id,
      url:cloudinaryResponse.secure_url
    }
    

   })
   res.status(201).json({
    success:true,
    message:"Application Submitted Successfully",
    application
   })






 })