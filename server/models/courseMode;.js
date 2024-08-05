import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
 title:{
    type:String,
    required:true
 },
 description:{
    type:String,
    required:true
 },
 image:{
    type:String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_pSWv2pNwyER1AQ5DZwmCciBWhuZKnowUw&s",
    required:true
 },
 duration:{
    type:Number,
    required:true
 },
 instructor:{
    type:mongoose.Schema.Types.ObjectId, ref:'Instructor'
 }
});
export const Course = mongoose.model("Course", courseSchema);
