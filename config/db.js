import  sqlite3  from  'sqlite3'
import HASH_FUNCTION from './hash.js';

const db = new sqlite3.Database("config/shop_autho_detalic.db")

class DB{

create_table(){
  const sql = `
    CREATE TABLE Orders (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Id_user_employee INTEGER NOT NULL,
    Id_user_busket INTEGER NOT NULL,
    pay_status INTEGER NOT NULL,
    Order_status INTEGER NOT NULL,
    Adress TEXT NOT NULL,
    FOREIGN KEY (Id_user_employee) REFERENCES Users(Id),
    FOREIGN KEY (Id_user_busket) REFERENCES User_busket(Id),
    FOREIGN KEY (pay_status) REFERENCES Pay_statuses(Id),
    FOREIGN KEY (Order_status) REFERENCES Order_statuses(Id)
)
  `;
  db.run(sql, function (err) {
    if(err){
      console.log("Ошибка при добавлении таблицы")
    }else
      console.log("Таблица добавленна")
  })

}

add_product(name, prise, img,  id_company, coment) {
  const sql = `
    INSERT INTO product (name, prise, img, id_company, "Coment")
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [name, prise, img, id_company, coment], function (err) {
    if (err) {
      console.error("Ошибка при добавлении товара:", err.message);
    } else {
      console.log(`Товар добавлен, ID: ${this.lastID}`);
    }
  });
}

add_category(category) {
  const sql = `
    INSERT INTO category (category)
    VALUES (?)
  `;

  db.run(sql, [category], function (err) {
    if (err) {
      console.error("Ошибка при добавлении:", err.message);
    } else {
      console.log(`Категория добавленна, ID: ${this.lastID}`);
    }
  });
}

add_role(role) {
  const sql = `
    INSERT INTO roles (role)
    VALUES (?)
  `;

  db.run(sql, [role], function (err) {
    if (err) {
      console.error("Ошибка при добавлении:", err.message);
    } else {
      console.log(`Роль добавленна, ID: ${this.lastID}`);
    }
  });
}

async addUser(name, fam, otc, email, phone, login, password, id_role) {
  const sql = `
    INSERT INTO Users (name, fam, otc, email, phone, login, password, id_role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [name, fam, otc, email, phone, login, (await HASH_FUNCTION.hashPassword(password)), id_role], function (err) {
    if (err) {
      console.error("Ошибка при добавлении пользователя:", err.message);
    } else {
      console.log(`Пользователь добавлен, ID: ${this.lastID}`);
    }
  });
}

add_Coutry_creater(Coutry_creater) {
  const sql = `
    INSERT INTO Coutry_creater (country)
    VALUES (?)
  `;

  db.run(sql, [Coutry_creater], function (err) {
    if (err) {
      console.error("Ошибка при добавлении:", err.message);
    } else {
      console.log(`Страна производитель добавленна, ID: ${this.lastID}`);
    }
  });
}

add_category_product(id_category, id_product) {
  const sql = `
    INSERT INTO categoryes_product (id_category, id_product)
    VALUES (?, ?)
  `;

  db.run(sql, [id_category, id_product], function (err) {
    if (err) {
      console.error("Ошибка при связывании категории и товара:", err.message);
    } else {
      console.log(`Связь категории–товара добавлена, ID: ${this.lastID}`);
    }
  });
}

add_company(company_name, id_country) {
  const sql = `
    INSERT INTO Company_creater (company_name, id_country)
    VALUES (?, ?)
  `;

  db.run(sql, [company_name, id_country], function (err) {
    if (err) {
      console.error("Ошибка при добавлении компании:", err.message);
    } else {
      console.log(`Компания добавлена, ID: ${this.lastID}`);
    }
  });
}

add_User_To_Basket(id_user, id_product, number_product = 1) {
  const sql = `
    INSERT INTO User_busket (id_user, id_product, number_produxt)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [id_user, id_product, number_product], function (err) {
    if (err) {
      console.error("Ошибка при добавлении товара в корзину:", err.message);
    } else {
      console.log(`Товар добавлен в корзину, ID: ${this.lastID}`);
    }
  });
}

add_User_To_Favorite(id_user, id_product) {
  const sql = `
    INSERT INTO User_favorite (id_user, id_product)
    VALUES (?, ?)
  `;

  db.run(sql, [id_user, id_product], function (err) {
    if (err) {
      console.error("Ошибка при добавлении товара в избранное:", err.message);
    } else {
      console.log(`Товар добавлен в избранное, ID: ${this.lastID}`);
    }
  });
}

async get_data(table_name = 'Users', column_name = null, column_value = null) {
  return new Promise((resolve, reject) => {
  let sql = ''
  if(column_value == null){
    sql = `SELECT * FROM ${table_name}`;
  }
  else{
    sql = `SELECT * FROM ${table_name} WHERE ${column_name} = '${column_value}'`;
  }
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Ошибка выборки:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

update_for_id(table_name, column_name, column_value, serdg_column_name, serdg_column_value) {
  const sql = `
    UPDATE ${table_name}
    SET ${column_name} = ?
    WHERE ${serdg_column_name} = ?
  `;

  db.run(sql, [column_value, serdg_column_value], function (err) {
    if (err) {
      console.error("Ошибка изменения image:", err.message);
    } else if (this.changes === 0) {
      console.warn(`Запись по полю ${serdg_column_name} = ${serdg_column_value} не найдеа`);
    } else {
      console.log(`Запись обновлена на ${column_value}`);
    }
  });
}

delete_qwery(table_name, column_name, column_value) {
  const sql = `
    DELETE FROM ${table_name}
    WHERE ${column_name} = ?
  `;

  db.run(sql, [column_value], function (err) {
    if (err) {
      console.error("Ошибка удаления записи:", err.message);
    } else if (this.changes === 0) {
      console.warn(`Запись по полю ${column_name} со значением: ${column_value} не найдена`);
    } else {
      console.log(`Запись по полю ${column_name} со значением: ${column_value} успешно удалёна`);
    }
  });
}

add_order_item(id_order, id_product, quantity, price) {
  const sql = `
    INSERT INTO Order_items (Id_order, Id_product, Quantity, Price)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [id_order, id_product, quantity, price], function (err) {
    if (err) {
      console.error("Ошибка при добавлении товара в заказ:", err.message);
    } else {
      console.log(`Товар добавлен в заказ, ID: ${this.lastID}`);
    }
  });
}

add_order(id_user_busket, adress, order_status, pay_status) {
  const sql = `
    INSERT INTO Orders (id_user_busket, adress, order_status, pay_status)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [id_user_busket, adress, order_status, pay_status], function (err) {
    if (err) {
      console.error("Ошибка при добавлении заказа:", err.message);
    } else {
      console.log(`Заказ добавлен, ID: ${this.lastID}`);
    }
  });
}

}

const d_b = new DB

// console.log(await d_b.get_data())
// console.log(await d_b.get_data("product"))

// await d_b.addUser("Адин","Админов","Админович","admin@mail.ru","89612389909",'2','2',2)
export default d_b
