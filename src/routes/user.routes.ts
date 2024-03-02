import express, { Express, NextFunction, Request, Response, Router } from 'express';
import User from '../models/userSchema';
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
.get()
//create
.post()
//update
.patch()
//delete
.delete();
export default router;