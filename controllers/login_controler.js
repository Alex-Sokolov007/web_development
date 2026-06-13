import express from "express"
import { app, PORT, JWT } from "../config/config.js"
import d_b from "../config/db.js"
import HASH_FUNCTION from "../config/hash.js"
import jwt from 'jsonwebtoken';

class Login_controler{
    async rendering_page(req, res){
        res.render("login")
    }
    async logining_user(req, res){
        try{
        const users = await d_b.get_data("Users", "login", req.body.login)
        let token
        if(users[0].login == req.body.login && await HASH_FUNCTION.verifyPassword(req.body.password,users[0].password)){
        token = jwt.sign(
            {status: true, user: users[0]},
             JWT.JWT_SECRET,
            { expiresIn: JWT.JWT_EXPIRES_IN }
            );

            res.cookie('token', token, { 
            httpOnly: true, 
            maxAge: 3600000 
            });
            // res.json(token)
    return res.redirect('/');
        }
        else
            console.log("Error logining")
        res.render("login")
        }catch(err){
            console.log(err)
            res.render("login")   
        }
    }

}

export default new Login_controler