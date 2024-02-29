import mongoose, { Schema } from "mongoose";

const productSchema: Schema = new mongoose.Schema({
name:{
    type: String,
    required: true
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
    required: true
}
});

export default mongoose.model("Product", productSchema);