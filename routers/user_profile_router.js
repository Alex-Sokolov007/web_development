import { Router } from "express";
import User_profile_controler from '../controllers/user_profile_controler.js'
import JWT from "../config/JWT.js";

const user_profile_router = new Router()

user_profile_router.get("/profile", JWT.authenticateToken, User_profile_controler.rendering_page)
user_profile_router.post("/password_swap", JWT.authenticateToken, User_profile_controler.update_password)
user_profile_router.post("/profile", JWT.authenticateToken, User_profile_controler.update_info)



export default user_profile_router