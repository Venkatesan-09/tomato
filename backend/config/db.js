import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://vp2064670:TOMATO@tomato.byavt5l.mongodb.net/fodd-del').then(()=>console.log("DB connected"))
    
}