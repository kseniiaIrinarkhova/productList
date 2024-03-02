import { Request, Response } from 'express';
import Store from '../models/store.models'

export default class StoreController {
    //CRUD operations for Store
    /**
     * Create Store in database
     * @param req Request
     * @param res Response
     * @returns Store object
     */
    async createStore(req: Request, res: Response) {
        try {
            //get required properties from request body
            const { name, address } = req.body;
            //check if they exsist
            if (!name || !address) {
                throw new Error("Name and Address must be provided.")
            }
            //try to create Store
            const newStore = await Store.create(req.body);
            //retern created entity
            return res.status(201).json({ data: newStore, message: "Store has beed created." });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }

    /**
     * Get all Stores from database
     * @param req Request
     * @param res Response
     * @returns list of Store objects
     */
    async getStores(req: Request, res: Response) {
        try {
            //get all Stores from database
            const result = await Store.find({});
            //return list of object
            return res.status(200).send({ data: result });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }
    /**
     * Get single Store by Id
     * @param req Request
     * @param res Response
     * @returns Store object
     */
    async getSingleStore(req: Request, res: Response) {
        try {
            //get id parameter
            const { id } = req.params;
            //try to get Store by id
            const store = await Store.findById({ _id: id });
            if (!store) {
                throw new Error("Requested Store not found!");
            }
            //return store
            return res.status(200).send({ data: store });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }

    /**
     * Update Store data
     * @param req Request
     * @param res Response
     * @returns updated Store with confirmation message
     */
    async updateStore(req: Request, res: Response) {
        try {
            //get id parameter
            const { id } = req.params;
            //try to get Store by id and change it
            const updatedStore = await Store.findByIdAndUpdate({ _id: id }, req.body, { new: true });
            if (!updatedStore) {
                throw new Error("Requested Store not found!");
            }
            //return updated store
            return res.status(200).send({ data: updatedStore, message: "Store has been updated." });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }

    async deleteStore(req: Request, res: Response) {
        try {
            //get id parameter
            const { id } = req.params;
            //try to get Store by id and change it
            const deletedStore = await Store.findByIdAndDelete({ _id: id });
            if (!deletedStore) {
                throw new Error("Requested Store not found!");
            }
            //return information about deleted store
            return res.status(200).send({ data: deletedStore, message: "Store has been deleted." });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }

}

