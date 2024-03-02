import express, { Express, NextFunction, Request, Response, Router } from 'express';
import  User  from '../models/userSchema';

export default class UserController{
    //CRUD operations for User
    async createUser(req:Request, res:Response){
        try {
           const{username, email} = req.body;
           if(!username || !email){
            throw new Error("Username and Email must be provided.")
           }
           const newUser = await User.create(req.body);
           return res.status(201).json({data : newUser});
        } catch (err) {
            res.status(500).json({message: (err as Error).message});
        }
    }
}

