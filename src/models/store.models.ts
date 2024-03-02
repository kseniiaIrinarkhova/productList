import { Schema, model } from "mongoose";
import { IStore } from "../types/main";

const storeSchema = new Schema<IStore>({
    name: {
        type: String,
        required: [true, "Name should not be empty!"]
    },
    address:{
        type: String,
        required:false
    },
    working_hours:{
        type: [{
            week_day:{
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
                required: [true, "Weekday should not be empty!"]
            },
            open :{
                type: String,  //Have to add validation for time regex!!!
                required: [true, "Open should not be empty!"]
            },
            close :{
                type: String,  //Have to add validation for time regex!!!
                required: [true, "Close should not be empty!"]
            }
        }]
    }
    
});

export default model<IStore>("Store", storeSchema);