import { Router } from "express";
import Basket_controler from "../controllers/basket_controlers.js";
import JWT from "../config/JWT.js";
import jwt from 'jsonwebtoken';

const basket_router = new Router()

basket_router.get("/busket", Basket_controler.render_page_busket)
basket_router.post("/new_order", JWT.authenticateToken, Basket_controler.new_order)
basket_router.post("/busket", JWT.authenticateToken, Basket_controler.delete_item_busket)
// basket_router.delete("/basket/:id", Basket_controler.delete_item_busket)


export default basket_router