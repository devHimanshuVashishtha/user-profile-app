const mongoose = require("mongoose");
const User = require("./models/UserProfile");
const Profile = require("./models/Users");
async function CalculateAverageAge() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/userProfileDB");
    console.log("mongoconnect");
    const details = await User.find();
    const totalAge = details.reduce((sum, profile) => sum + profile.Age, 0);
    const averageAge = totalAge / details.length;
    console.log(averageAge);
    const filter_profile = await User.find({ Age: { $gt: 25 } });
    const Profiletodelete = filter_profile.map((profile) => profile.user_id);
    await User.deleteMany({
      user_id: { $in: Profiletodelete },
    });
    await Profile.deleteMany({ _id: { $in: Profiletodelete } });

    console.log("Data Deleted!!!!");

    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

CalculateAverageAge();
