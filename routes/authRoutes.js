import express from "express";
const router = express.Router();

import rateLimiter from "express-rate-limit"

const apiLimiter = rateLimiter({
    windowMs:15 * 60 * 1000, // 15 minutes
    max:10,
    message:"Too many request from this IP address, please try again after 15 minutes", 
})

import { register, login, updateUser, getCurrentUser } from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js"

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/getCurrentUser").get(authenticateUser,getCurrentUser)

export default router;
