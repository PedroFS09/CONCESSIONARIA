CREATE DATABASE IF NOT EXISTS concessionaria_autoelite;
USE concessionaria_autoelite;

CREATE TABLE IF NOT EXISTS veiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(150) NOT NULL,
    marca VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL
);

INSERT INTO veiculos (modelo, marca, ano, valor, status) VALUES
('Corolla', 'Toyota', 2024, 179900.00, 'Disponível'),
('Civic', 'Honda', 2023, 169800.00, 'Disponível'),
('Golf GTI', 'Volkswagen', 2022, 219900.00, 'Em análise'),
('Onix', 'Chevrolet', 2021, 89900.00, 'Vendido'),
('BMW X5', 'BMW', 2025, 389900.00, 'Disponível');

SELECT * FROM veiculos;

create database biblioteca_dom;
use biblioteca_dom;

create table livros(
id int auto_increment primary key,
titulo varchar(150) not null,
autor varchar(100) not null,
ano int not null
);

insert into livros(titulo, autor, ano)values
('Dom Casmurro', 'Machado de Assis', 1899),
('O Hobbit', 'J. R. R. Tolkien', 1937),
('1984', 'George Orell', 1937),
('O Pedqueno Principe', 'Antonie e Saint Exupery', 1943),
('Harry Potter e Pedra Filosofal', 'J. K. Rowling', 1997);
select * from livros;