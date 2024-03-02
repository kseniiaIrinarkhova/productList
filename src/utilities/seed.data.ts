import { IUser, IStore, IProduct, IProductList, WeekDay, DayWorkingHours } from "../types/main";
import { Types } from "mongoose";

const users: Array<IUser> = [
    {
        username: "traveller",
        first_name: "Bilbo",
        last_name: "Baggins",
        email: "b.beggins@shire.jrrt"
    },
    {
        username: "carrier",
        first_name: "Frodo",
        last_name: "Baggins",
        email: "f.beggins@shire.jrrt"
    },
    {
        username: "gray",
        first_name: "Gandalf",
        email: "gendalf@valinor.jrrt"
    },
    {
        username: "chief",
        first_name: "Saruman",
        email: "saruman@isengard.jrrt"
    },
    {
        username: "the_eye",
        first_name: "Sauron",
        email: "sauron@mordor.jrrt"
    },
];

const stores: Array<IStore> = [
    {
        name: "Costco",
        address: "7725 188th Ave NE, Redmond, WA 98052",
        working_hours: [
            {
                week_day: "Saturday",
                open: "9:30 AM",
                close: "6 PM"
            },
            {
                week_day: "Sunday",
                open: "10 AM",
                close: "6 PM"
            }
        ]
    },
    {
        name: "Fred Meyer",
        address: "2041 148th Ave NE, Bellevue, WA 98007",
        working_hours: [
            {
                week_day: "Monday",
                open: "6 AM",
                close: "11 PM"
            },
            {
                week_day: "Thursday",
                open: "6 AM",
                close: "11 PM"
            }
        ]
    },
    {
        name: "Safeway",
        address: "630 228th Ave NE, Sammamish, WA 98074",
        working_hours: [
            {
                week_day: "Wednesday",
                open: "5 AM",
                close: '1 AM'
            },
            {
                week_day: "Thursday",
                open: "5 AM",
                close: '1 AM'
            },
            {
                week_day: "Friday",
                open: "5 AM",
                close: '1 AM'
            },
            {
                week_day: "Saturday",
                open: "5 AM",
                close: '1 AM'
            }
        ]
    },
    {
        name: "Target",
        address: "4053 Factoria Square Mall SE, Bellevue, WA 98006",
        working_hours: [
            {
                week_day: "Sunday",
                open: "8 AM",
                close: "10 PM"
            },
            {
                week_day: "Tuesday",
                open: "8 AM",
                close: "10 PM"
            },
            {
                week_day: "Thursday",
                open: "8 AM",
                close: "10 PM"
            }
        ]
    },
    {
        name: "Trader Joe's",
        address: "975 NW Gilman Blvd, Issaquah, WA 98027",
        working_hours: [
            {
                week_day: "Monday",
                open: "8 AM",
                close: "9 PM"
            },
            {
                week_day: "Tuesday",
                open: "8 AM",
                close: "9 PM"
            },
            {
                week_day: "Wednesday",
                open: "8 AM",
                close: "9 PM"
            },
            {
                week_day: "Friday",
                open: "8 AM",
                close: "9 PM"
            }
        ]
    },
];

const products: Array<IProduct> = [
    {
        name: "Milk",
        category: "Dairy & Eggs"
    },
    {
        name: "Potato",
        category: "Fruits & Vegetables"
    },
    {
        name: "Sparkling water",
        category: "Beverages"
    },
    {
        name: "Chair",
        category: "Garden & Patio"
    },
    {
        name: "Umbrella",
        category: "Home"
    }
];

/**
 * Helper function to create array of ProductList 
 * @param userSeeds Array of IUser with _id properties from database
 * @param storeSeeds Array of IStore with _id properties from database
 * @param productSeeds Array of IProduct with _id properties from database
 * @returns 
 */
function createProductListArray(
    userSeeds: Array<(IUser & { _id: Types.ObjectId; })>,
    storeSeeds: Array<(IStore & { _id: Types.ObjectId; })>,
    productSeeds: Array<(IProduct & { _id: Types.ObjectId; })>
): Array<IProductList> {
    //declare resulting array
    let productlists: Array<IProductList> = [];
    //create 5 ernties for array
    while (productlists.length < 5) {
        //declare entry in productList array
        let productlist: IProductList;
        //find random index for userSeeds array
        const userIndex: number = Math.floor(Math.random() * 5);
        //find random index for storeSeeds array
        const storeIndex: number = Math.floor(Math.random() * 5);
        //declare array of products in list
        const products: Array<{ product_id: Types.ObjectId, amount: number, price: number }> = []
        //create 3 product for each list
        for (let i = 0; i < 3; i++) {
            //find random index for productSeeds
            const productIndex: number = Math.floor(Math.random() * 5);
            //create product entity
            const product: { product_id: Types.ObjectId, amount: number, price: number } = {
                product_id: productSeeds[productIndex]._id, //get _id for foreign key connection
                amount: Math.floor(Math.random() * 100),
                price: Math.floor(Math.random() * 1000)
            }
            //add product to products in list
            products.push(product);
        }
        //create product list
        productlist = {
            user_id: userSeeds[userIndex]._id, //get _id for foreign key connection
            store_id: storeSeeds[storeIndex]._id, //get _id for foreign key connection
            products: products
        }
        //add product list to resulting array
        productlists.push(productlist);

    }
    //return array
    return productlists;
}

export { users, stores, products, createProductListArray }