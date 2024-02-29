import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const connectionString: string = process.env.ATLAS_URI || "";

mongoose.connect(connectionString);

app.get("/", (req: Request, res: Response) => {
    res.send("Product list API");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});