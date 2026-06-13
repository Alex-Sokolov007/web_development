import { Router } from "express";
import JWT from "../config/JWT.js";
import admin_controler from "../controllers/admin.js";

const admin_router = new Router()

admin_router.get("/admin", JWT.authenticateToken, admin_controler.render_page)
admin_router.post("/delete_user", JWT.authenticateToken, admin_controler.delete_user)
admin_router.post("/update_user", JWT.authenticateToken, admin_controler.update_user)
admin_router.post("/update_order_status", JWT.authenticateToken, admin_controler.update_order_status)



// admin_router.post("/password_swap", JWT.authenticateToken, User_profile_controler.update_password)
// admin_router.post("/profile", JWT.authenticateToken, User_profile_controler.update_info)



export default admin_router