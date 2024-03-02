import { Request, Response } from 'express';
import Product from '../models/product.models'

export default class ProductController {
    //CRUD operations for Product
    /**
     * Create Product in database
     * @param req Request
     * @param res Response
     * @returns Product object
     */
    async createProduct(req: Request, res: Response) {
        try {
            //get required properties from request body
            const { name, category } = req.body;
            //check if they exsist
            if (!name || !category) {
                throw new Error("Name and Category must be provided.")
            }
            //try to create Product
            const newProduct = await Product.create(req.body);
            //retern created entity
            return res.status(201).json({ data: newProduct, message: "Product has beed created." });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }

    /**
     * Get all Products from database
     * @param req Request
     * @param res Response
     * @returns list of Product objects
     */
    async getProducts(req: Request, res: Response) {
        try {
            //get all products from database
            const result = await Product.find({});
            //return list of object
            return res.status(200).send({ data: result });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }
    /**
     * Get single Product by Id
     * @param req Request
     * @param res Response
     * @returns Product object
     */
    async getSingleProduct(req: Request, res: Response) {
        try {
            //get id parameter
            const { id } = req.params;
            //try to get product by id
            const product = await Product.findById({ _id: id });
            if (!product) {
                throw new Error("Requested Product not found!");
            }
            //return product
            return res.status(200).send({ data: product });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }

    /**
     * Update Product data
     * @param req Request
     * @param res Response
     * @returns updated Product with confirmation message
     */
    async updateProduct(req: Request, res: Response) {
        try {
            //get id parameter
            const { id } = req.params;
            //try to get product by id and change it
            const updatedProduct = await Product.findByIdAndUpdate({ _id: id }, req.body, { new: true });
            if (!updatedProduct) {
                throw new Error("Requested Product not found!");
            }
            //return updated product
            return res.status(200).send({ data: updatedProduct, message: "Product has been updated." });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            //get id parameter
            const { id } = req.params;
            //try to get Product by id and change it
            const deletedProduct = await Product.findByIdAndDelete({ _id: id });
            if (!deletedProduct) {
                throw new Error("Requested Product not found!");
            }
            //return information about deleted product
            return res.status(200).send({ data: deletedProduct, message: "Product has been deleted." });
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }

}

