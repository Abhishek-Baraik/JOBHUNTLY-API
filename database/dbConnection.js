import mongoose from "mongoose";

export const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "JOB_BOARD"
    })
    .then(()=>{
        console.log("Connected to db");
    })
    .catch(err =>{
        console.log(`Some error occured while connectiong to db ${err}`);
    });
}