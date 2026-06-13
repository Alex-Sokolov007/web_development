import express from "express"
import { app, PORT, JWT } from "../config/config.js"
import d_b from "../config/db.js"
import jwt from 'jsonwebtoken';
import HASH_FUNCTION from "../config/hash.js";


class User_profile_controler{
    async rendering_page(req, res){
        const decoded = jwt.verify(req.cookies.token, JWT.JWT_SECRET);
        const db_data = await d_b.get_data("Users", 'id_user', decoded.user.id_user)
        decoded.user = db_data[0]
        const orders = await d_b.get_data("Orders", "id_user_busket", decoded.user.id_user)
        for(let i = 0; i<orders.length; i++){
            const order_items = await d_b.get_data("Order_items", "Id_order", orders[i].Id)
            const order_status = await d_b.get_data("Order_statuses", "id", orders[i].order_status)
            const pay_status = await d_b.get_data("Pay_statuses", "id", orders[i].pay_status)
            orders[i].order_status = order_status[0].order_status
            orders[i].pay_status = pay_status[0].pay_status
            for(let j = 0; j<order_items.length; j++){
                const product = await d_b.get_data("product", "id_product", order_items[j].Id_product)
                order_items[j].product = product[0]
                }
            orders[i].order_items = order_items
        }
        decoded.orders = orders
        // console.log(decoded.orders[0].order_items)
        res.render('user_profile', decoded)
    }
    async update_info(req, res){
        const decoded = jwt.verify(req.cookies.token, JWT.JWT_SECRET);
        {
        await d_b.update_for_id("Users", "fam", req.body.fam, "id_user", decoded.user.id_user);
        await d_b.update_for_id("Users", "name", req.body.name, "id_user", decoded.user.id_user);
        await d_b.update_for_id("Users", "otc", req.body.otch, "id_user", decoded.user.id_user);
        await d_b.update_for_id("Users", "email", req.body.email, "id_user", decoded.user.id_user);
        await d_b.update_for_id("Users", "phone", req.body.phone, "id_user", decoded.user.id_user);
        await d_b.update_for_id("Users", "login", req.body.login, "id_user", decoded.user.id_user);
        }
        res.redirect("/profile")

    }
    async update_password(req, res){
        const decoded = jwt.verify(req.cookies.token, JWT.JWT_SECRET);
        // console.log(decoded)
        const user = await d_b.get_data("Users", "id_user", decoded.user.id_user)
        console.log(user)
        if(await HASH_FUNCTION.verifyPassword(req.body.old_password, user[0].password && !req.body.new_password)){
            await d_b.update_for_id("Users", "password", await HASH_FUNCTION.hashPassword(req.body.new_password), "id_user", decoded.user.id_user)
        }
        res.redirect("/profile")
    }
}

export default new User_profile_controler