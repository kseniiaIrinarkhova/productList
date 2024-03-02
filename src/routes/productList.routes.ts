import express from 'express';
import ProductListListController from "../controllers/productlist.controllers"

const router = express.Router();
const productListController = new ProductListListController();

//routes without parameters
router.route('/')
    //read
    .get(productListController.getProductLists)
    //create
    .post(productListController.createProductList);

//routes with parameters
router.route('/:id')
    //read
    .get(productListController.getSingleProductList)
    //update
    .patch(productListController.updateProductList)
    //delete
    .delete(productListController.deleteProductList);

export default router;