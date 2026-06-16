import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"

class create_product_controler{
    async render_page(req, res){
        const Company_creater = await d_b.get_data("Company_creater")
        // console.log(Company_creater)
        const data = {Company_creater}
        res.render("create_product", data)
    }
    async create_product(req, res){
        // await d_b.addUser(req.body.user_name, req.body.user_sure_name, req.body.user_otch,req.body.email,req.body.phone,req.body.login,req.body.password,1)
        console.log(req.body)
        await d_b.add_product(req.body.name,req.body.price,req.body.img,req.body.id_company,req.body.Coment)
        res.redirect("/create_product")
    }
}

export default new create_product_controler