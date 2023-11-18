import express, {Request, Response,NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
// import { User,Admin,Course } from "../db/db";
// import {SECRET,authenticateJwt} from "../middleware/auth"
// import {userSchema , userloginSchema} from "../zodschemas/userschema"
import {handlesignup ,handlelogin } from "../controllers/user"

const userrouter=express.Router();
userrouter.use(express.json());
userrouter.use(cors())


userrouter.post('/signup',handlesignup);

userrouter.post('/login', handlelogin);



export default userrouter