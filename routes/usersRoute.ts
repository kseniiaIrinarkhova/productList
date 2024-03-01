import express, { Express, NextFunction, Request, Response, Router } from 'express';

const router = express.Router();

//routes without parameters
router.route('/')
//read
.get((req:Request, res:Response)=>{
  res.send("Main users route")  
})
//create
.post();

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