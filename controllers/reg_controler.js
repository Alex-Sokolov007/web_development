import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"

class Reg_controler{
    async render_page(req, res){
        res.render("reg")
    }
    async new_user(req, res){
        d_b.addUser(req.body.user_name, req.body.user_sure_name, req.body.user_otch,req.body.email,req.body.phone,req.body.login,req.body.password,1)
        
        res.redirect("/login")
    }
}

export default new Reg_controler