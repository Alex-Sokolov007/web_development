import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"

class Reg_controler{
    async render_page(req, res){
        res.render("reg", {status: undefined})
    }
    async new_user(req, res){
        if(req.body.password == req.body.password_confirm){
            d_b.addUser(req.body.user_name, req.body.user_sure_name, req.body.user_otch,req.body.email,req.body.phone,req.body.login,req.body.password,1)
            res.redirect("/login")
        }else(
        res.render("reg", {status: "Error"})
        )
    }
}

export default new Reg_controler