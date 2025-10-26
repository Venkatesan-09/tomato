import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://FOODDEL:FOODDEL@cluster0.dhzgfmq.mongodb.net/food-del').then(()=>console.log('DB connected'));
}

//mongodb+srv://FOODDEL:<db_password>@cluster0.dhzgfmq.mongodb.net/?