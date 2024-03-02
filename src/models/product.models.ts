import { Schema, model } from "mongoose";
import { IProduct } from "../types/main";

const productSchema = new Schema<IProduct>({
name:{
    type: String,
        required: [true, "Name should not be empty!"]
},
category:{
    type: String,
    enum: [
        "Fruits & Vegetables",
        "Meat & Seafood",
        "Deli",
        "Bakery",
        "Floral",
        "Pantry",
        "Dairy & Eggs",
        "Frozen",
        "Natural & Organic",
        "Beverages",
        "Candy",
        "Health & Wellness",
        "Personal Care",
        "Beauty",
        "Baby",
        "Laundry",
        "Paper Products",
        "Cleaning & Supplies",
        "Kitchen & Dining",
        "Home",
        "Electronics",
        "Garden & Patio",
        "Toys & Games",
        "Dog Food",
        "Cat Food",
        "Pet Supplies",
        "Furniture"
    ],
    required: [true, "Category should not be empty!"]
}
});

export default model<IProduct>("Product", productSchema);