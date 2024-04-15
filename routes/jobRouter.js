import express  from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {deleteJob, getAllJobs, getMyJobs, postJob, updateJob,getSingleJob} from "../controllers/jobController.js"

const router=express.Router();
router.get("/getall",getAllJobs);
//add a new job to the database
router.post("/post", isAuthenticated,postJob)
router.get("/getMyJobs", isAuthenticated,getMyJobs)
router.put('/update/:id',isAuthenticated,updateJob)
router.delete('/delete/:id',isAuthenticated,deleteJob)
router.get("/singlejob/:id",isAuthenticated,getSingleJob)
export default  router;
