import mongoose from "mongoose";

const dbConnection=()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.5",{
        dbName:"Job",
    }).then(()=>{
        console.log("MongoDB Connected...")
    }).catch((error)=>{
        console.log(`Error: ${error}`)
    })
};
export default dbConnection;
