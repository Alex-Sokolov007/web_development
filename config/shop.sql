-- Создание таблицы Roles
CREATE TABLE Roles (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Role TEXT NOT NULL
);

-- Создание таблицы Users
CREATE TABLE Users (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    User_name TEXT NOT NULL,
    User_surname TEXT NOT NULL,
    Role INTEGER NOT NULL,
    Login TEXT NOT NULL UNIQUE,
    Password TEXT NOT NULL,
    Phone TEXT,
    FOREIGN KEY (Role) REFERENCES Roles(Id)
);

-- Создание таблицы Shop_point
CREATE TABLE Shop_point (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT NOT NULL,
    Adress TEXT NOT NULL,
    Hot_phone TEXT,
    Img TEXT
);

-- Создание таблицы Shop_employee
CREATE TABLE Shop_employee (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Id_user INTEGER NOT NULL,
    Id_Shop_point INTEGER NOT NULL,
    FOREIGN KEY (Id_user) REFERENCES Users(Id),
    FOREIGN KEY (Id_Shop_point) REFERENCES Shop_point(Id)
);

-- Создание таблицы Types_of_measurement тип исчисления
CREATE TABLE Types_of_measurement (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Type_of_measurement TEXT NOT NULL
);

-- Создание таблицы Products
CREATE TABLE Products (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Priсe INTEGER NOT NULL,
    Type_of_measurement INTEGER NOT NULL,
    Measurement INTEGER NOT NULL,
    Img TEXT,
    FOREIGN KEY (Type_of_measurement) REFERENCES Types_of_measurement(Id),
    FOREIGN KEY (Measurement) REFERENCES Types_of_measurement(Id)
);

-- Создание таблицы Products_of_shop_poin
CREATE TABLE Products_of_shop_poin (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Id_shop_poin INTEGER NOT NULL,
    Id_product INTEGER NOT NULL,
    FOREIGN KEY (Id_shop_poin) REFERENCES Shop_point(Id),
    FOREIGN KEY (Id_product) REFERENCES Products(Id)
);

-- Создание таблицы User_busket
CREATE TABLE User_busket (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Id_user INTEGER NOT NULL,
    Id_product INTEGER NOT NULL,
    Quantity INTEGER NOT NULL,
    FOREIGN KEY (Id_user) REFERENCES Users(Id),
    FOREIGN KEY (Id_product) REFERENCES Products(Id)
);

-- Создание таблицы Order_statuses
CREATE TABLE Order_statuses (
    Id_status INTEGER PRIMARY KEY AUTOINCREMENT,
    Status TEXT NOT NULL
);

-- Создание таблицы Pay_statuses
CREATE TABLE Pay_statuses (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Pay_status TEXT NOT NULL
);

-- Создание таблицы Orders
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
);