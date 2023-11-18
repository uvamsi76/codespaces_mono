"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import { User,Admin,Course } from "../db/db";
// import {SECRET,authenticateJwt} from "../middleware/auth"
// import {userSchema , userloginSchema} from "../zodschemas/userschema"
const user_1 = require("../controllers/user");
const userrouter = express_1.default.Router();
userrouter.use(express_1.default.json());
userrouter.use((0, cors_1.default)());
userrouter.post('/signup', user_1.handlesignup);
userrouter.post('/login', user_1.handlelogin);
exports.default = userrouter;
