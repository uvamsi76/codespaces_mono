import express, {Request, Response,NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
// import { User,Admin,Course } from "../db/db";
import {SECRET,authenticateJwt} from "../middleware/auth"
import {userSchema , userloginSchema} from "../zodschemas/userschema"
import { PrismaClient } from '@prisma/client'
import { UserType } from '../zodschemas/userschema'
const prisma = new PrismaClient()
async function Finduser(Email:any){
  const user = prisma.user.findFirst({
    where:{
      email:Email
    }
  })
  return user
}
async function Createuser(userdata:UserType) {
  console.log('Createuser')
  const user=await prisma.user.create({
    data:userdata,
  });
  return user
}
//signup function
export const handlesignup=async (req:Request, res:Response) => {
    console.log("handlesignup")
    const { firstname,lastname, username, email, phoneno, password, country, dob, profilePic }= req.body;
    const DOB =new Date(dob)
    const userdata={ firstname,lastname, username, email, phoneno, password, country, DOB, profilePic }
    const parsedInput= userSchema.safeParse(userdata)
    if(!parsedInput.success){
      res.status(411).json({error:parsedInput.error.issues[0].message})
      return;
    }
    const uname=parsedInput.data.username
    const user = await Finduser(email);
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    }
    else {
      try{
      console.log('parsedInput')
      const newUser = await Createuser(parsedInput.data);
      // if(newUser){
      //   const role= userdata.admin.isAdmin?"admin":"user"
      //   console.log(status.id)
      console.log(userdata,newUser)
        const token = jwt.sign({ email , id:newUser.id}, SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token , newUser });
      // }
      // else{
      //   res.status(500).json({message:"Internal error sorry for inconvineance"})
      // }
    }
      catch(err){
        console.log(err)
      }
    }
}

//LOGIN

export const handlelogin =async (req:Request, res:Response) => {
    const { email, password } = req.body;
    const parsedInput=userloginSchema.safeParse({email, password})
    if(!parsedInput.success){
      res.status(411).json({error:parsedInput.error.issues[0].message})
      return
    }
    try{
    const user = await Finduser( email);
    if (user) {
      if(user.password!=password){
        res.status(404).json({message:"Incorrect Password"})
        return
      }
      console.log(user.id)
      const token = jwt.sign({ email, id: user.id}, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token ,email});
    } 
    else {
      res.status(403).json({ message: 'User not found' });
    }
  }
  catch(err){
    res.status(500).json({message:"internal error sorry for the inconvinience"})
  }
}