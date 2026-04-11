CREATE TABLE users (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    password VARCHAR(255),
    create_time DATETIME
);

INSERT INTO users (name, password) VALUES ('root', 'root');