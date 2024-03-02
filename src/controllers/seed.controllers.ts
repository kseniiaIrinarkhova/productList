import { Request, Response } from 'express';
import { users, stores, products, createProductListArray } from '../utilities/seed.data';
import Store from '../models/store.models';
import User from '../models/user.models';
import Product from '../models/product.models';
import ProductList from '../models/productList.models';

/**
 * Helper controller to add test data to database
 */
export default class SeedController {
    /**
     * add tested data
     * @param req Request
     * @param res Response
     */
    async addSeeds(req: Request, res: Response){
        try {
            //clean User collection
            await User.deleteMany({});
            //add test data to User collection
            const userSeeds = await User.create(users)
            //clean Store collection
            await Store.deleteMany({});
            //add test data to Store collection
            const storeSeeds = await Store.create(stores)
            //clean Product collection
            await Product.deleteMany({});
            //add test data to Product collection
            const productSeeds = await Product.create(products)
            //in productList test data we need to reference to user, store, and product _id from database. create array of productList based on previously created data
            const productLists = createProductListArray(userSeeds,storeSeeds,productSeeds);
            //clean productList collection
            await ProductList.deleteMany({});
            //add test data to Product collection
            const productListSeeds = await ProductList.create(productLists);
            //return all creaated data in response
            return res.status(201).send({ user_data: userSeeds, store_data : storeSeeds, product_data: productSeeds , productlist_data: productListSeeds})
        } catch (err) {
            return res.status(500).send({message: (err as Error).message})
        }
    }
}