CREATE DATABASE polypedia;

CREATE TABLE list (
    list_id SERIAL PRIMARY KEY,
    list_name VARCHAR(255) NOT NULL,
    list_color INT NOT NULL,
    list_theme INT NOT NULL,
    list_city INT NOT NULL,
    list_year INT NOT NULL,
    polyuser_id INT NOT NULL,
    list_description VARCHAR(5000) NOT NULL,
    validation BOOLEAN,
    FOREIGN KEY (list_city) REFERENCES city(city_id) ON DELETE CASCADE,
    FOREIGN KEY (list_color) REFERENCES color(color_id) ON DELETE CASCADE,
    FOREIGN KEY (list_theme) REFERENCES theme(theme_id) ON DELETE CASCADE,
    FOREIGN KEY (polyuser_id) REFERENCES polyuser(polyuser_id)
);

CREATE TABLE city (
    city_id SERIAL PRIMARY KEY,
    city_name VARCHAR(255) NOT NULL,
    validation BOOLEAN
);

CREATE TABLE polyuser (
    polyuser_id SERIAL PRIMARY KEY,
    polyuser_name VARCHAR(255) NOT NULL,
    polyuser_mail VARCHAR(255) NOT NULL UNIQUE,
    polyuser_role VARCHAR(255) NOT NULL,
    polyuser_password VARCHAR(255) NOT NULL,
    polyuser_description VARCHAR(500) NOT NULL
);

CREATE TABLE color (
    color_id SERIAL PRIMARY KEY,
    color_name VARCHAR(255) NOT NULL,
    validation BOOLEAN
);

CREATE TABLE theme (
    theme_id SERIAL PRIMARY KEY,
    theme_name VARCHAR(255) NOT NULL
);