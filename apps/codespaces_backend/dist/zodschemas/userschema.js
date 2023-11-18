"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.userloginSchema = void 0;
const zod_1 = require("zod");
const common_1 = require("./common");
exports.userloginSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "enter valid email address" }),
    password: zod_1.z.string().min(8, { message: "Incorrect password" }).max(20, { message: "Incorrect password" }).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])()(?=.*[!@#$%^&*]).{8,}$/gm, { message: "Incorrect password" })
});
exports.userSchema = zod_1.z.object({
    firstname: zod_1.z.string().max(20, { message: "firstname max limit is 20" }).min(5, { message: "firstname min limit is 5" }),
    lastname: zod_1.z.string().max(20, { message: "lastname max limit is 20" }).min(5, { message: "lastname min limit is 5" }),
    username: zod_1.z.string().max(15, { message: "username max limit is 15" }).min(5, { message: "username min limit is 5" }),
    email: zod_1.z.string().email({ message: "enter valid email address" }),
    phoneno: zod_1.z.string().refine((value) => /^\d{10}$/.test(value), { message: "phoneno max limit is 10 and it should only contain numbers" }),
    password: zod_1.z.string().min(8).max(20, { message: "password max limit is 20" }).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])()(?=.*[!@#$%^&*]).{8,}$/gm, { message: "password should contain A-Z a-z 0-9 !@#$%^&* each" }),
    country: zod_1.z.enum([common_1.countryEnum.America, common_1.countryEnum.China, common_1.countryEnum.India, common_1.countryEnum.Pakistan]).refine((val) => val in common_1.countryEnum, { message: "country select only from limit" }),
    DOB: zod_1.z.date().refine((val) => val < new Date(), { message: "enter valid date" }),
    profilePic: common_1.urlSchema //"link"
});
