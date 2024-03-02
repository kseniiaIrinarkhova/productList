import { Request, Response } from 'express';
import ProductList from '../models/productList.models'

export default class ProductListController {
    //CRUD operations for Product list
    /**
     * Create Product list in database
     * @param req Request
     * @param res Response
     * @returns ProductList object
     */
    async createProductList(req: Request, res: Response) {
        try {
            //get required properties from request body
            const { user_id, store_id} = req.body;
            //check if they exsist
            if (!user_id || !store_id) {
                throw new Error("User ID and Store ID must be provided.")
            }
            //try to create Product list
            const newProductList = await ProductList.create(req.body);
            //retern created entity
            return res.status(201).json({ data: newProductList, message: "Product list has beed created." });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }

    /**
     * Get all ProductLists from database
     * @param req Request
     * @param res Response
     * @returns list of ProductList objects
     */
    async getProductLists(req: Request, res: Response) {
        try {
            //get all product lists from database
            const result = await ProductList.find({});
            //return list of object
            return res.status(200).send({ data: result });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }
    /**
     * Get single ProductList by Id
     * @param req Request
     * @param res Response
     * @returns ProductList object
     */
    async getSingleProductList(req: Request, res: Response) {
        try {
            //get id parameter
            const { id } = req.params;
            //try to get product list by id
            const productList = await ProductList.findById({ _id: id });
            if (!productList) {
                throw new Error("Requested ProductList not found!");
            }
            //return productList
            return res.status(200).send({ data: productList });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }

    /**
     * Update ProductList data
     * @param req Request
     * @param res Response
     * @returns updated ProductList with confirmation message
     */
    async updateProductList(req: Request, res: Response) {
        try {
            //get id parameter
            const { id } = req.params;
            //try to get product list by id and change it
            const updatedProductList = await ProductList.findByIdAndUpdate({ _id: id }, req.body, { new: true });
            if (!updatedProductList) {
                throw new Error("Requested ProductList not found!");
            }
            //return updated product list
            return res.status(200).send({ data: updatedProductList, message: "ProductList has been updated." });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }

    async deleteProductList(req: Request, res: Response) {
        try {
            //get id parameter
            const { id } = req.params;
            //try to get Product list by id and change it
            const deletedProductList = await ProductList.findByIdAndDelete({ _id: id });
            if (!deletedProductList) {
                throw new Error("Requested ProductList not found!");
            }
            //return information about deleted product list
            return res.status(200).send({ data: deletedProductList, message: "ProductList has been deleted." });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }

}

