import jwt from 'jsonwebtoken';
import express from "express"
import { app, PORT} from "../config/config.js"
import d_b from "../config/db.js"
import cookieParser from 'cookie-parser';


const JWT = {
    JWT_SECRET: 'super_secret_key_ultimate_v2', // Храните в .env
    JWT_EXPIRES_IN: '1h', // Время жизни токена
    async authenticateToken(req, res, next) {
      const token = req.cookies?.token;
  
  if (!token) {
    return res.status(401).json({ error: 'Токен не предоставлен' });
  }
  
  jwt.verify(token, JWT.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Неверный или истекший токен' });
    }
    
    req.user = user; // Добавляем информацию о пользователе в запрос
    next();
  });
},
async logouting_user(req, res) {
    try {
        // Удаляем токен из cookie
        res.cookie('token', '', { 
            httpOnly: true, 
            maxAge: 1,           // Устанавливаем минимальный возраст
            expires: new Date(0) // Или сразу устанавливаем дату в прошлое
        });

        // Перенаправляем на страницу входа
        return res.redirect("/");
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
}
}

export default JWT