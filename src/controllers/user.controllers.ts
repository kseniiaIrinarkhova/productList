import { Request, Response } from 'express';
import User from '../models/user.models';
import Store from '../models/store.models';
import Product from '../models/product.models';
import ProductList from '../models/productList.models';
import { IStore, IProduct, IProductList, IUserList, ProductInfo, StoreList } from '../types/main';
import { Types } from 'mongoose';

export default class UserController {
    //CRUD operations for User
    /**
     * Create User in database
     * @param req Request
     * @param res Response
     * @returns user object
     */
    async createUser(req: Request, res: Response) {
        try {
            //get required properties from request body
            const { username, email } = req.body;
            //check if they exsist
            if (!username || !email) {
                throw new Error("Username and Email must be provided.")
            }
            //try to create user
            const newUser = await User.create(req.body);
            //retern created entity
            return res.status(201).json({ data: newUser, message: "User has beed created." });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }

    /**
     * Get all users from database
     * @param req Request
     * @param res Response
     * @returns list of user objects
     */
    async getUsers(req: Request, res: Response) {
        try {
            //get all users from database
            const result = await User.find({});
            //return list of object
            return res.status(200).send({ data: result });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }
    /**
     * Get single user by Id
     * @param req Request
     * @param res Response
     * @returns user object
     */
    async getSingleUser(req: Request, res: Response) {
        try {
            //get id parameter
            const { id } = req.params;
            //try to get user by id
            const user = await User.findById({ _id: id });
            if (!user) {
                throw new Error("Requested User not found!");
            }
            //return User
            return res.status(200).send({ data: user });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }

    /**
     * Update user data
     * @param req Request
     * @param res Response
     * @returns updated user with confirmation message
     */
    async updateUser(req: Request, res: Response) {
        try {
            //get id parameter
            const { id } = req.params;
            //try to get user by id and change it
            const updatedUser = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true });
            if (!updatedUser) {
                throw new Error("Requested User not found!");
            }
            //return updated user
            return res.status(200).send({ data: updatedUser, message: "User has been updated." });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }

    /**
     * Delete user data
     * @param req 
     * @param res 
     * @returns result of operation
     */
    async deleteUser(req: Request, res: Response) {
        try {
            //get id parameter
            const { id } = req.params;
            //try to get user by id and change it
            const deletedUser = await User.findByIdAndDelete({ _id: id });
            if (!deletedUser) {
                throw new Error("Requested User not found!");
            }
            //return information about deleted user
            return res.status(200).send({ data: deletedUser, message: "User has been deleted." });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }

    async getUserProductLists(req: Request, res: Response) {
        try {
            //get id parameter
            const { id } = req.params;
            //check query parameters
            const storeName = req.query["store"] as string;
            //try to get user by id
            const user = await User.findById({ _id: id });
            //do not find user
            if (!user) {
                throw new Error("Requested User not found!");
            }
            let userLists: IUserList = { user: user };
            let userProductLists: Array<(IProductList & { _id: Types.ObjectId })>;
            //get all lists or only filtered by store name
            if (storeName) {
                //try to find store
                const store = await Store.findByName(storeName);
                //wrong store name
                if (!store) {
                    throw new Error("Requested Store not found!");
                }
                //get all lists that user reate for store with specific name
                userProductLists = await ProductList.findByUserIdAndStoreId(new Types.ObjectId(id), store._id);
            }
            else {
                //get all lists that created by user
                userProductLists = await ProductList.findByUserId(new Types.ObjectId(id));
            }

            if (!userProductLists) {
                return res.status(200).send({ data: { user: user, msg: "User did not create product list." } });
            }
            //If user has product list

            let productList: StoreList = {};
            //find full information about store and products
            for (const list of userProductLists) {
                //get store information
                productList.store = await Store.findById(list.store_id);
                //if there are products in list
                if (list.products) {
                    //get information about every product
                    list.products.forEach(async (p) => {
                        //create a new ProductIlfo ibject
                        const product: ProductInfo = {
                            product: await Product.findById(p.product_id) as (IProduct & { _id: Types.ObjectId }), //get full product info
                            amount: p.amount,
                            price: p.price
                        }
                        //check if it's first product in list - initialize list
                        if (!productList.products) productList.products = [];
                        //add product info
                        productList.products.push(product);
                    });
                }
                //check if 1st user list - initialize productlists property
                if (!userLists.productlists) userLists.productlists = [];
                //add  product list
                userLists.productlists.push(productList);
            }

            //return all data about user lists
            return res.status(200).send({ data: userLists });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }

}

