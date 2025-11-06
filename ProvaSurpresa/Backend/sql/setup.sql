-- Script para criar o banco de dados e tabelas do sistema Prova Surpresa

-- Criar o banco de dados (se não existir)
CREATE DATABASE IF NOT EXISTS provaweb2;

-- Usar o banco de dados
USE provaweb2;

-- Tabela de usuários (login)
CREATE TABLE IF NOT EXISTS login (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'aluno'
);

-- Tabela de provas
CREATE TABLE IF NOT EXISTS prova (
    id INT PRIMARY KEY AUTO_INCREMENT,
    login INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (login) REFERENCES login(id) ON DELETE CASCADE
);

-- Tabela de perguntas
CREATE TABLE IF NOT EXISTS pergunta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    prova INT NOT NULL,
    ordem INT NOT NULL,
    pergunta TEXT NOT NULL,
    imagem VARCHAR(255),
    FOREIGN KEY (prova) REFERENCES prova(id) ON DELETE CASCADE
);

-- Tabela de alternativas
CREATE TABLE IF NOT EXISTS alternativa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pergunta INT NOT NULL,
    descricao TEXT NOT NULL,
    correta BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (pergunta) REFERENCES pergunta(id) ON DELETE CASCADE
);

-- Tabela de respostas das provas
CREATE TABLE IF NOT EXISTS prova_resposta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    login INT NOT NULL,
    prova INT NOT NULL,
    dt_resposta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (login) REFERENCES login(id) ON DELETE CASCADE,
    FOREIGN KEY (prova) REFERENCES prova(id) ON DELETE CASCADE
);

-- Tabela de itens de resposta
CREATE TABLE IF NOT EXISTS prova_resposta_item (
    id INT PRIMARY KEY AUTO_INCREMENT,
    prova_resposta INT NOT NULL,
    pergunta INT NOT NULL,
    alternativa INT NOT NULL,
    FOREIGN KEY (prova_resposta) REFERENCES prova_resposta(id) ON DELETE CASCADE,
    FOREIGN KEY (pergunta) REFERENCES pergunta(id) ON DELETE CASCADE,
    FOREIGN KEY (alternativa) REFERENCES alternativa(id) ON DELETE CASCADE
);

-- Verificar tabelas criadas
SHOW TABLES;

SELECT 'Banco de dados e tabelas criadas com sucesso!' AS Status;
