import express from 'express';
import ProductController from "../controllers/product.controllers"

const router = express.Router();
const productController = new ProductController();

//routes without parameters
router.route('/')
    //read
    .get(productController.getProducts)
    //create
    .post(productController.createProduct);

//routes with parameters
router.route('/:id')
    //read
    .get(productController.getSingleProduct)
    //update
    .patch(productController.updateProduct)
    //delete
    .delete(productController.deleteProduct);

export default router;