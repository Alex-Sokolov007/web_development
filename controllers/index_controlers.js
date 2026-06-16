import express from "express"
import { app, JWT, PORT } from "../config/config.js"
import d_b from "../config/db.js"
import { match } from "path-to-regexp"
import jwt from 'jsonwebtoken';


class Index_controler{
    async rendering_page(req, res){
        const products = await d_b.get_data("product")
        if (!req.cookies.token) {

        return res.render("index", {status: false, products, user: {}});
    }
    
    // Пользователь авторизован - проверяем токен
    try {
        const decoded = jwt.verify(req.cookies.token, JWT.JWT_SECRET);
        decoded.products = products
        return res.render("index", decoded);

    } catch (err) {
        // Токиен невалиден - показываем страницу входа
        console.log(err)
    }
    }

    async add_item(req, res){
        let in_busket = false
        const user_busket = await d_b.get_data("User_busket", "id_user", req.body.id_user)
        if(req.body.id_user && req.body.id_product)
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
        res.redirect("/")
    }

}

export default new Index_controler