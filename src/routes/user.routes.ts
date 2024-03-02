import express from 'express';
import UserController from "../controllers/user.controllers"

const router = express.Router();
const userController = new UserController();

//routes without parameters
router.route('/')
//read
.get(userController.getUsers)
//create
.post(userController.createUser);

//routes with parameters
router.route('/:id')
//read
.get(userController.getSingleUser)
//update
.patch(userController.updateUser)
//delete
.delete(userController.deleteUser);

//related routes
router.route('/:id/productlists')
//read
.get(userController.getUserProductLists)
export default router;