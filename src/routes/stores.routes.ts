import express from 'express';
import StoreController from "../controllers/store.controllers"

const router = express.Router();
const storeController = new StoreController();

//routes without parameters
router.route('/')
    //read
    .get(storeController.getStores)
    //create
    .post(storeController.createStore);

//routes with parameters
router.route('/:id')
    //read
    .get(storeController.getSingleStore)
    //update
    .patch(storeController.updateStore)
    //delete
    .delete(storeController.deleteStore);

export default router;