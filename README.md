<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS'
description: 'This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Reto Técnico AWS

Se utilizo el framework serverless con un servidor HttpApi para realizar el reto.

Este cuenta con 2 endpoints de MÉTODO GET Y 1 endpoint de MÉTODO POST

## Ruta Base

```
https://paffn3mjh2.execute-api.us-west-2.amazonaws.com/
```

Se mostrara el siguiente mensaje:

```json
{
  "message": "Welcome to TEST API",
  "author": "Moises Lazaro"
}
```

## Endpoints válidos

---

### Consultar información de la Star Wars API - GET

```
https://paffn3mjh2.execute-api.us-west-2.amazonaws.com/${type}/${id}
```

Para este endpoint se necesita de dos parámetros.

El type puede uno de los siguientes

```
films, people, planets, species, starships, vehicles
```

Mientras que con el id puede enviar cualquier número positivo, es decir, del 1 en adelante.

Ejemplo:

```
https://paffn3mjh2.execute-api.us-west-2.amazonaws.com/films/1
```

---

### Crear registro dentro de DynamoDB - POST

```
https://paffn3mjh2.execute-api.us-west-2.amazonaws.com/works
```

Para la creación de registro se tiene que enviar los campos

```
{ name , description}
```

---

### Consultar registros de DynamoDB - GET

Con este endpoint se puede consultar todos los trabajos registrados

```
https://paffn3mjh2.execute-api.us-west-2.amazonaws.com/works
```

---

### Consultar registro por ID de DynamoDB - GET

Con este endpoint se puede consultar un registro en especifico agregando el id.

```
https://paffn3mjh2.execute-api.us-west-2.amazonaws.com/works/{id}
```

---

### Eliminar registro de DynamoDB por ID - DELETE

Con este endpoint se puede eliminar un registro de la BD.

```
https://paffn3mjh2.execute-api.us-west-2.amazonaws.com/{id}
```
