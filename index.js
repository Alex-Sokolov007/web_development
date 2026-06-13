import express from "express"
import { app, PORT } from "./config/config.js"
import Index_router from "./routers/index_router.js"
import item_router from "./routers/item_router.js"
import basket_router from "./routers/busket_router.js"
// import getAll from "./config/db.js"
import login_router from "./routers/login_router.js"
import reg_router from "./routers/reg_router.js"
import user_profile_router from "./routers/user_profile_router.js"
import admin_router from "./routers/admin_router.js"

app.use('/', item_router)
app.use('/', admin_router)
app.use('/', Index_router)
app.use('/', basket_router)
app.use('/', login_router)
app.use('/', reg_router)
app.use('/', user_profile_router)

try{
    app.listen(PORT, (req, res) =>{
        console.log(`Server started on: ${PORT} port`)
    })
}catch (e){
    console.log(e)
}