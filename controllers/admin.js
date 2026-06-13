import express from "express"
import { app, PORT, JWT } from "../config/config.js"
import d_b from "../config/db.js"
import jwt from 'jsonwebtoken';
import HASH_FUNCTION from "../config/hash.js";


class admin_controler{
    async render_page(req, res) {
    const decoded = jwt.verify(req.cookies.token, JWT.JWT_SECRET);
    const users = await d_b.get_data("Users");
    const roles = await d_b.get_data("roles");
    const orders = await d_b.get_data("Orders");
    
    // ПУНКТ 1: Загружаем все возможные статусы для выпадающих списков
    const all_order_statuses = await d_b.get_data("Order_statuses");
    const all_pay_statuses = await d_b.get_data("Pay_statuses");

    for (let i = 0; i < orders.length; i++) {
        const order_items = await d_b.get_data("Order_items", "Id_order", orders[i].Id);
        
        // ПУНКТ 2: Сохраняем оригинальные ID для корректной работы <select> в будущем
        orders[i].id_order_status = orders[i].order_status;
        orders[i].id_pay_status = orders[i].pay_status;

        // ПУНКТ 3: Получаем текстовые названия текущих статусов (для классов или вывода)
        const order_status_res = await d_b.get_data("Order_statuses", "id", orders[i].order_status);
        const pay_status_res = await d_b.get_data("Pay_statuses", "id", orders[i].pay_status);
        
        orders[i].order_status_text = order_status_res[0]?.order_status || "Неизвестно";
        orders[i].pay_status_text = pay_status_res[0]?.pay_status || "Неизвестно";

        for (let j = 0; j < order_items.length; j++) {
            const product = await d_b.get_data("product", "id_product", order_items[j].Id_product);
            order_items[j].product = product[0];
        }
        orders[i].order_items = order_items;
    }

    // Передаем данные в шаблон
    decoded.orders = orders;
    decoded.users = users;
    decoded.roles = roles;
    // ПУНКТ 4: Обязательно передаем массивы статусов в EJS
    decoded.all_order_statuses = all_order_statuses;
    decoded.all_pay_statuses = all_pay_statuses;

    res.render("admin", decoded);
    }
    async delete_user(req,res){
        await d_b.delete_qwery("Users", "id_user", req.body.id_user)
        res.redirect("/admin")
    }
    async update_user(req, res){
        {
        await d_b.update_for_id("Users", "fam", req.body.fam, "id_user", req.body.id_user);
        await d_b.update_for_id("Users", "name", req.body.name, "id_user", req.body.id_user);
        await d_b.update_for_id("Users", "otc", req.body.otc, "id_user", req.body.id_user);
        await d_b.update_for_id("Users", "email", req.body.email, "id_user", req.body.id_user);
        await d_b.update_for_id("Users", "phone", req.body.phone, "id_user", req.body.id_user);
        await d_b.update_for_id("Users", "login", req.body.login, "id_user", req.body.id_user);
        await d_b.update_for_id("Users", "id_role", req.body.id_role, "id_user", req.body.id_user);
        
    }
        res.redirect("/admin")
    }
    async update_order_status(req, res){
        await d_b.update_for_id("Orders", "order_status", req.body.order_status, "Id", req.body.id_order)
        await d_b.update_for_id("Orders", "pay_status", req.body.pay_status, "Id", req.body.id_order)
        res.redirect("/admin")
    }
}

export default new admin_controler