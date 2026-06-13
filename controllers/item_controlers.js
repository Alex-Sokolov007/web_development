import express from "express"
import { app, PORT, JWT } from "../config/config.js"
import d_b from "../config/db.js"
import jwt from 'jsonwebtoken';

class Item_controler{
    async item_info(req, res){
        const product = await d_b.get_data("Product", "Id_product", req.params.id)
        // console.log(product)
        if (!req.cookies.token) {

        return res.render("item", {status: false, product});
    }
    
    // Пользователь авторизован - проверяем токен
    try {
        const decoded = jwt.verify(req.cookies.token, JWT.JWT_SECRET);
        decoded.product = product
        // console.log(decoded)
        // Пользователь авторизован - показываем главную страницу
        // return res.render("index", { user: decoded });
        return res.render("item", decoded);

    } catch (err) {
        res.status(500).json()
    }
    }
    async add_item(req, res){
        let in_busket = false
        const user_busket = await d_b.get_data("User_busket", "id_user", req.body.id_user)
        for(let i = 0; i<user_busket.length; i++){
            if(req.body.id_user == user_busket[i].id_user && req.body.id_product == user_busket[i].id_product){
                in_busket = true
                await d_b.update_for_id("User_busket","number_produxt",user_busket[i].number_produxt+1,"id_busket", user_busket[i].id_busket)
                break
            }else{
                in_busket = false
            }
        }if(!in_busket){
        await d_b.add_User_To_Basket(req.body.id_user,req.body.id_product,1)
        }
        res.redirect(`/item/${req.params.id}`)
    }
}

export default new Item_controler