import { Schema, model } from "mongoose";
import { IUser } from "../types/main";

const userSchema = new Schema<IUser>({
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

export default model<IUser>("User", userSchema);