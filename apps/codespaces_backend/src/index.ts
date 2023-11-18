import express, {Request, Response,NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import userrouter from "../router/userrouter"

dotenv.config();

const PORT =3010;

const app=express();

app.use(bodyParser.json())
app.use(cors())
app.use(express.json());

console.log("test app.ts")

app.use('/api', userrouter )

app.get('/',(req,res)=>{
  res.json("working fine mowa ")
})

app.listen(PORT, () => console.log(`Server running on port ${PORT} ok`));