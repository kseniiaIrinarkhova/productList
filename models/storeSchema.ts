import mongoose, { Schema } from "mongoose";

const storeSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required:false
    },
    workingHours:{
        type: [{
            weekDay:{
                type: String,
                enum:[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ],
                required: true
            },
            open :{
                type: String,  //Have to add validation for time regex!!!
                required: true 
            },
            close :{
                type: String,  //Have to add validation for time regex!!!
                required: true 
            }
        }]
    }
    
});

export default mongoose.model("Store", storeSchema);