import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://Equilfy:AoGswXIDQaYRquIB@cluster0.5mf89am.mongodb.net/deliveroo").then(() => console.log("Database connected"));
} 