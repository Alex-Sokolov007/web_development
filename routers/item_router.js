import { Router } from "express";
import Item_controler from "../controllers/item_controlers.js";
import JWT from "../config/JWT.js";

const item_router = new Router()

item_router.get("/item/:id", Item_controler.item_info)
item_router.post("/item/:id", JWT.authenticateToken, Item_controler.add_item)
item_router.post("/add_product_rating", JWT.authenticateToken, Item_controler.add_product_rating)

export default item_router