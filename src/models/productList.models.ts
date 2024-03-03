import { Schema, model, Types, Model } from "mongoose";
import { IProductList } from "../types/main";

interface IProductListModel extends Model<IProductList> {
    findByUserId(user_id: Types.ObjectId): Array<(IProductList & { _id: Types.ObjectId })>;
    findByUserIdAndStoreId(user_id: Types.ObjectId, store_id: Types.ObjectId): Array<(IProductList & { _id: Types.ObjectId })>;
}

const productListSchema = new Schema({
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

//To search product lists related to selected user, added index that sort bu user_id
productListSchema.index({user_id: 1}); 

//get all product lists created by user
productListSchema.static('findByUserId', function (user_id: Types.ObjectId) : Array<(IProductList & {_id: Types.ObjectId})> {
    return this.find({user_id : user_id});
} )

//get all product lists created by user for specific store
productListSchema.static('findByUserIdAndStoreId', function (user_id: Types.ObjectId, store_id: Types.ObjectId): Array<(IProductList & { _id: Types.ObjectId })> {
    return this.find({ user_id: user_id , store_id: store_id});
})

const ProductList: IProductListModel =  model<IProductList, IProductListModel>("ProductList", productListSchema);

export default ProductList;