import mongoose from "mongoose";

const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"Job",
    }).then(()=>{
        console.log("MongoDB Connected...")
    }).catch((error)=>{
        console.log(`Error: ${error}`)
    })
};
export default dbConnection;
