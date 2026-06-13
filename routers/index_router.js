import { Router } from "express";
import Index_controler from "../controllers/index_controlers.js";
import JWT from "../config/JWT.js";

const test_router = new Router()

// test_router.post("/", Index_controler.post1)

test_router.get("/", Index_controler.rendering_page)
test_router.post("/add_item", JWT.authenticateToken, Index_controler.add_item)
// test_router.put("/", Index_controler.put)

export default test_router