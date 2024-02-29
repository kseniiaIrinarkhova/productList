import express, { Express, NextFunction, Request, Response, Router } from 'express';

const router = express.Router();

router.route('/')
.get((req:Request, res:Response)=>{
  res.send("Main users route")  
})

export default router;