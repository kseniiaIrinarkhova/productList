import { Schema, model } from "mongoose";
import { IStore } from "../types/main";

const storeSchema = new Schema<IStore>({
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

export default model<IStore>("Store", storeSchema);