//import
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRoute from '../routes/usersRoute';
import roductsRoute from '../routes/productsRoute';
import storesRoute from '../routes/storesRoute';
import productListsRoute from '../routes/productListsRoute';

//configuration
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const connectionString: string = process.env.ATLAS_URI || "";

mongoose.connect(connectionString);

//middleware

//routes

app.get("/", (req: Request, res: Response) => {
    res.send("Product list API");
});

app.use('/api/users', usersRoute );
app.use('/api/products', roductsRoute);
app.use('/api/stores', storesRoute);
app.use('/api/productlists', productListsRoute);

//error handling
app.use((req: Request, res: Response) => {
    res.status(404).json({ errors: [{ message: "Resource Not Found" }] });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});