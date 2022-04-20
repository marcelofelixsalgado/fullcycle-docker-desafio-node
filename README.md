# Curso Full Cycle 3.0 - Módulo Docker - Desafio Nginx e Node.js

## Introdução

Este projeto é um desafio do módulo Docker do curso Full Cycle 3.0.

A idéia principal é que quando um usuário acesse o nginx, o mesmo fará uma chamada em nossa aplicação node.js. Essa aplicação por sua vez adicionará um registro em nosso banco de dados mysql, cadastrando um nome na tabela people.

O retorno da aplicação node.js para o nginx deverá ser:

```
<h1>Full Cycle Rocks!</h1>
- Lista de nomes cadastrada no banco de dados.
````


## Instruções para rodar a imagem docker

Podemos utilizar o seguinte comando para rodar a imagem:

```
docker-compose up -d
```

Para acompanhar a subida da aplicações, rode cada comando em um terminal:
```
docker logs db -f
```
```
docker logs app -f
```
```
docker logs nginx -f
```

## Inserindo registros

Para cadastrar novos registros, execute o comando abaixo, informando o nome da pessoa no body do request:
````
curl -X POST http://localhost:8080/v1/people -H "Content-Type: application/json" -d '{ "name" : "nome1" }'
```