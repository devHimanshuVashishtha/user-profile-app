const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref:'Users'},
  dob: Date,
  mobile: Number,
  Age:Number,
});


module.exports=mongoose.model("profile",userProfileSchema)