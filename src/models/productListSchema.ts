import { Schema, model } from "mongoose";
import { IProductList } from "../types/main";

const productListSchema = new Schema<IProductList>({
user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User_id should not be empty!"]
},
store_id:{
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: [true, "Store_id should not be empty!"]
},
products:{
    type : [{
        product_id :{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        amount : Number, // required in DB validation
        price: Number // required in DB validation
    }]
}
});

export default model<IProductList>("ProductList", productListSchema);