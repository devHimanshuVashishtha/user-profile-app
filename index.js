const mongoose = require("mongoose");
const User = require("./models/Users");
const Profile = require("./models/UserProfile");
const data = require("./data/data.js");
const bcrypt = require("bcrypt");

function CalculateAge(dob) {
  const birthdate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthdate.getFullYear();
  return age;
}

async function ProtectPassword(password) {
  const newPass = await bcrypt.hash(password, 10);
  // console.log(newPass)
  return newPass
}

async function connectDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/userProfileDB");
  console.log("DataBase Connected");

  await Promise.all(
    data.map(async (user) => {
      const bcryptPasword = await ProtectPassword(user.password);
      const saveUser = await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: bcryptPasword,
      });
      const age = CalculateAge(user.dob);
      await Profile.create({
        user_id: saveUser._id,
        dob: user.dob,
        mobile: user.mobile,
        Age: age,
      });

      console.log("Inserted");
    })
  );
  console.log("All user Profile Created");
  mongoose.disconnect();
}

connectDB();
