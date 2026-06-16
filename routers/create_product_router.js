import { Router } from "express";
import JWT from "../config/JWT.js";
import create_product_controler from "../controllers/create_product_controler.js"

const create_product_router = new Router()

create_product_router.get("/create_product", JWT.authenticateToken, create_product_controler.render_page)
create_product_router.post("/create_product", JWT.authenticateToken, create_product_controler.create_product)

export default create_product_router