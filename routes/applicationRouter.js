import express  from "express";
import {isAuthenticated} from "../middlewares/auth.js"
const router=express.Router()
import {employerGetAllApplications,jobseekerDeleteApplication,jobseekerGetAllApplications,postApplication} from "../controllers/applicationController.js"

router.get("/jobseeker/getall",isAuthenticated,jobseekerGetAllApplications)
router.get("/employer/getall",isAuthenticated,employerGetAllApplications)
router.delete("/delete/:id",isAuthenticated,jobseekerDeleteApplication)
router.post("/post",isAuthenticated,postApplication)


export default  router;
