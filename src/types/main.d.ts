import {Types, Document} from 'mongoose';

//types and interfaces for main data entries
/**
 * User type
 */
interface IUser {
    /**
     * user username
     */
    username: string;
    /**
     * user first name
     */
    first_name?: string;
    /**
     * user lest name
     */
    last_name?: string;
    /**
     * user email
     */
    email: string
}

/**
 * WeekDay String Literal Type 
 */
type WeekDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
/**
 * DayWorkingHours type
 */
type DayWorkingHours = {
    /**
     * Day of week
     */
    week_day: WeekDay;
    /**
     * hour when is opened
     */
    open: string;
    /**
     * hour when is closed
     */
    close: string
}

/**
 * Store interface
 */
interface IStore {
    /**
     * Name of store
     */
    name: string;
    /**
     * Store address
     */
    address: string;
    /**
     * Working hours. Arrey of: week days, open hour, close hour
     */
    working_hours: DayWorkingHours[]
}

/**
 * Category String Literal Type 
 */
type Category =
    "Fruits & Vegetables" |
    "Meat & Seafood" |
    "Deli" |
    "Bakery" |
    "Floral" |
    "Pantry" |
    "Dairy & Eggs" |
    "Frozen" |
    "Natural & Organic" |
    "Beverages" |
    "Candy" |
    "Health & Wellness" |
    "Personal Care" |
    "Beauty" |
    "Baby" |
    "Laundry" |
    "Paper Products" |
    "Cleaning & Supplies" |
    "Kitchen & Dining" |
    "Home" |
    "Electronics" |
    "Garden & Patio" |
    "Toys & Games" |
    "Dog Food" |
    "Cat Food" |
    "Pet Supplies" |
    "Furniture";

/**
 * Product interface
 */
interface IProduct {
    /**
         * Name of product
         */
    name: string;
    category: Category
}

/**
 * Product list interface
 */
interface IProductList extends Document {
    /**
     * foreign key to User
     */
    user_id: Types.ObjectId;
    /**
     * foreign key to Store
     */
    store_id: Types.ObjectId;
    /**
     * Array of products. 
     * */
    products: {
        /**
         * foreign key to Product
         */
        product_id: Types.ObjectId, 
        /**
         * amount of products
         */
        amount: number, 
        /**
         * price for 1 product
         */
        price:number}[]
}

/**
 * User lists interface
 */
interface IUserList {
    /**
     * User information
     */
    user: (IUser & {_id: Types.ObjectId});
    /**
     * Array of product lists
     */
    productlists: Array<
    {
            /**
             * Store information
             */
            store: (IStore & { _id: Types.ObjectId } )
            /**
             * products list
             */
            products: Array<{
                /**
                 * product information
                 */
                product: (IProduct & { _id: Types.ObjectId })
                /*
                * amount of products
                */
                amount: number,
                /**
                 * price for 1 product
                 */
                price: number
            }>
    }>;
}

export { IUser, IStore, IProduct, IProductList, WeekDay, DayWorkingHours, IUserList }