import express, { Express, NextFunction, Request, Response, Router } from 'express';
import  User  from '../models/userSchema';

export default class UserController{
    //CRUD operations for User
    /**
     * Create User in database
     * @param req Request
     * @param res Response
     * @returns user object
     */
    async createUser(req:Request, res:Response){
        try {
            //get required properties from request body
           const{username, email} = req.body;
           //check if they exsist
           if(!username || !email){
            throw new Error("Username and Email must be provided.")
           }
           //try to create user
           const newUser = await User.create(req.body);
           //retern created entity
           return res.status(201).json({data : newUser});
        } catch (err) {
            return res.status(500).json({message: (err as Error).message});
        }
    }

    /**
     * Get all users from database
     * @param req Request
     * @param res Response
     * @returns list of user objects
     */
    async getUsers(req: Request, res: Response){
        try {
            //get all users from database
            const result = await User.find({});
            //return list of object
            return res.status(200).send({data: result});
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message });
        }
    }
    
}

