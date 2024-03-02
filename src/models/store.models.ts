import { Model, Schema, Types, model } from "mongoose";
import { IStore } from "../types/main";

interface IStoreModel extends Model<IStore>{
    findByName(storeName: string):(IStore & {_id: Types.ObjectId});
}

const storeSchema = new Schema({
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

//to find stores by name quickly, added index
storeSchema.index({name : 1});

/**
 * Static method to get store by name (first possible)
 */
storeSchema.static("findByName", function (storeName: string): (IStore & { _id: Types.ObjectId }) {
    return this.findOne({name: storeName});
});

const Store: IStoreModel =  model<IStore, IStoreModel>("Store", storeSchema);

export default Store;