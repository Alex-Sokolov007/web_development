import express from "express"
import { app, PORT, JWT } from "../config/config.js"
import d_b from "../config/db.js"
import jwt from 'jsonwebtoken';

class Item_controler{
    async item_info(req, res){
        const product = await d_b.get_data("Product", "Id_product", req.params.id)
        const Product_Rating = await d_b.get_data("Product_Rating", "id_product", product[0].id_product)
        for(let i = 0; i<Product_Rating.length; i++){
            const user = await d_b.get_data("Users","id_user", Product_Rating[i].id_user)
            Product_Rating[i].user = user[0]
        }
        const Company_creater = await d_b.get_data("Company_creater","id_company", product[0].id_company)
        const country = await d_b.get_data("Coutry_creater", "id_coutry", Company_creater[0].id_country)
        Company_creater[0].country = country[0]
        product.Company_creater = Company_creater[0]
        product.Product_Rating = Product_Rating
        // console.log(product)
        if (!req.cookies.token) {

        return res.render("item", {status: false, product});
    }
    
    // Пользователь авторизован - проверяем токен
    try {
        const decoded = jwt.verify(req.cookies.token, JWT.JWT_SECRET);
        decoded.product = product
        // console.log(decoded.product.Product_Rating)
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
    async add_product_rating(req, res){
        const decoded = jwt.verify(req.cookies.token, JWT.JWT_SECRET);
        await d_b.add_product_rating(req.body.id_product, req.body.stars, req.body.coment, decoded.user.id_user)
        res.redirect(`/item/${req.body.id_product}`)
    }
}

export default new Item_controler