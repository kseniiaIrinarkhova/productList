import { Schema, model } from "mongoose";
import { IUser } from "../types/main";

const userSchema = new Schema<IUser>({
username:{
    type: String,
    required: [true, "Username should not be empty!"]
},
first_name: String,
last_name: String,
email:{
    type: String,
    required: [true, "Email should not be empty!"]
}
});

export default model<IUser>("User", userSchema);