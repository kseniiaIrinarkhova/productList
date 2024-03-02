import { Request, Response } from 'express';
import { users, stores } from '../utilities/seed.data';
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
            await User.deleteMany({});
            const userSeeds = await User.create(users)
            await Store.deleteMany({});
            const storeSeeds = await Store.create(stores)
            return res.status(201).send({ user_data: userSeeds, store_data : storeSeeds })
        } catch (err) {
            return res.status(500).send({message: (err as Error).message})
        }
        

    }
}