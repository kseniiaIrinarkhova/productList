import mongoose, { Schema } from "mongoose";

const userSchema:Schema = new mongoose.Schema({
username:{
    type: String,
    required: true
},
first_name: String,
last_name: String,
email:{
    type: String,
    required: true
}
});

export default mongoose.model("User", userSchema);