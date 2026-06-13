import express from "express"
import { app, PORT} from "../config/config.js"
import d_b from "../config/db.js"
import jwt from 'jsonwebtoken';
import JWT from "../config/JWT.js";

class Basket_controler{
    async new_order(req, res){
        console.log(req.body)
        const decoded = jwt.verify(req.cookies.token, JWT.JWT_SECRET);
        await d_b.add_order(decoded.user.id_user, req.body.adress, 1, 1)
        let id_order = await d_b.get_data("Orders")
        id_order = id_order[id_order.length-1].Id
        for(let i = 0; i<req.body.id_product.length; i++){
            await d_b.add_order_item(id_order, req.body.id_product[i], req.body.quantity[i], req.body.Prise[i])
        }
        await d_b.delete_qwery("User_busket","id_user",decoded.user.id_user)
        res.redirect("/busket")
    }
    async delete_item_busket(req, res){
       console.log(req.body)
        const decoded = jwt.verify(req.cookies.token, JWT.JWT_SECRET);
        const products = await d_b.get_data("User_busket", "id_user", decoded.user.id_user)
        const id_product = Number(req.body.id_product); // конвертируем сразу
        const prod = products.find(id => id.id_product === id_product);

        if (!prod) {
        return res.status(404).json({ error: 'Товар не найден' });
        }else{
        await d_b.delete_qwery("User_busket", "id_busket", prod.id_busket)
        res.redirect("/busket")
        }
    }
    async render_page_busket(req, res){
        if(req.cookies.token){
        const decoded = jwt.verify(req.cookies.token, JWT.JWT_SECRET);
        const products_in_busket = await d_b.get_data("User_busket", "id_user", decoded.user.id_user)
        // decoded.id_busket = []
        for(let i = 0; i <products_in_busket.length; i++){
            const product = await d_b.get_data("product", "id_product", products_in_busket[i].id_product)
            product[0].number_produxt = products_in_busket[i].number_produxt
            decoded.id_busket = products_in_busket[i].id_busket
            products_in_busket[i] = product[0]
            
        }
        decoded.products_in_busket = products_in_busket
        // console.log(decoded)
        res.render('basket', decoded)
    }else{
        res.redirect("/login")
    }
    }
}

export default new Basket_controler