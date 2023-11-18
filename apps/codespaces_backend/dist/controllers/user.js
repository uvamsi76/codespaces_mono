"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlelogin = exports.handlesignup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { User,Admin,Course } from "../db/db";
const auth_1 = require("../middleware/auth");
const userschema_1 = require("../zodschemas/userschema");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function Finduser(Email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = prisma.user.findFirst({
            where: {
                email: Email
            }
        });
        return user;
    });
}
function Createuser(userdata) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Createuser');
        const user = yield prisma.user.create({
            data: userdata,
        });
        return user;
    });
}
//signup function
const handlesignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("handlesignup");
    const { firstname, lastname, username, email, phoneno, password, country, dob, profilePic } = req.body;
    const DOB = new Date(dob);
    const userdata = { firstname, lastname, username, email, phoneno, password, country, DOB, profilePic };
    const parsedInput = userschema_1.userSchema.safeParse(userdata);
    if (!parsedInput.success) {
        res.status(411).json({ error: parsedInput.error.issues[0].message });
        return;
    }
    const uname = parsedInput.data.username;
    const user = yield Finduser(email);
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    }
    else {
        try {
            console.log('parsedInput');
            const newUser = yield Createuser(parsedInput.data);
            // if(newUser){
            //   const role= userdata.admin.isAdmin?"admin":"user"
            //   console.log(status.id)
            console.log(userdata, newUser);
            const token = jsonwebtoken_1.default.sign({ email, id: newUser.id }, auth_1.SECRET, { expiresIn: '1h' });
            res.json({ message: 'User created successfully', token, newUser });
            // }
            // else{
            //   res.status(500).json({message:"Internal error sorry for inconvineance"})
            // }
        }
        catch (err) {
            console.log(err);
        }
    }
});
exports.handlesignup = handlesignup;
//LOGIN
const handlelogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const parsedInput = userschema_1.userloginSchema.safeParse({ email, password });
    if (!parsedInput.success) {
        res.status(411).json({ error: parsedInput.error.issues[0].message });
        return;
    }
    try {
        const user = yield Finduser(email);
        if (user) {
            if (user.password != password) {
                res.status(404).json({ message: "Incorrect Password" });
                return;
            }
            console.log(user.id);
            const token = jsonwebtoken_1.default.sign({ email, id: user.id }, auth_1.SECRET, { expiresIn: '1h' });
            res.json({ message: 'Logged in successfully', token, email });
        }
        else {
            res.status(403).json({ message: 'User not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: "internal error sorry for the inconvinience" });
    }
});
exports.handlelogin = handlelogin;
