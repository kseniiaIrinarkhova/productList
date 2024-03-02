//import
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.config";
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import storeRoutes from './routes/stores.routes';
import productListRoutes from './routes/productList.routes';
import SeedController from "./controllers/seed.controllers";

//configuration
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const connectionString: string = process.env.ATLAS_URI || "";

mongoose.connect(connectionString);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes

// //Seed route (uncomment to add seed data to database)
// app.get("/seed", new SeedController().addSeeds)

app.get("/", (req: Request, res: Response) => {
    res.send("Product list API");
});

app.use('/api/users', userRoutes );
app.use('/api/products', productRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/productlists', productListRoutes);

//error handling
app.use((req: Request, res: Response) => {
    res.status(404).json({ errors: [{ message: "Resource Not Found" }] });
});

//connecting to MongoDB and starting server
startDB();

//functions

async function startDB(){
    try {
        await connectDB(process.env.ATLAS_URI);
        console.log('Mongodb is connected.')
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        })
    } catch (err) {
        console.log(err)
    }
}