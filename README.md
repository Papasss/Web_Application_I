# README


# 🎬 Film Library Manager

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

Libreria in JavaScript per gestire la tua collezione personale di film. Permette di memorizzare i titoli, tenere traccia dei preferiti, gestire le date di visione e assegnare un punteggio.

---

## ✨ Funzionalità

- **Architettura a Oggetti:** Basato su costruttori `Film` e `FilmLibrary` per una gestione modulare.
- **Feature aggiuntive:** `SQLite Viewer`, `REST Client`, `Express`
- **Database:** `films.db`

## 🚀 Installazione

Assicurati di avere [Node.js](https://nodejs.org/) installato.

1. Clona il repository sul tuo computer:
   ```bash
   git clone [https://github.com/Papasss/Web_Application_I.git)



# ⚙️ APIs

APIs per gestire operazioni CRUD (Create, Read, Update, Delete) della libreria dei Film.

## List avaible films

## 🌐 Base URL
* **URL base:** `/api/films/`

## 🛤️ HTTP Method
* **Metodo:** `GET`

## 📖 Description
* **Retrieve all the avaible films of the library** 

## ⚡ Request query parameter
**None**

## 📥 Request body
**None**

## ⚡ Response
**Success response (200 OK): In case of success, returns an array of questions in JSON format**
**Failure response (500 Internal Server Error): In case of failure, return an error message**

## 📤 Response body

```json
[
   {
      "id": 3,
      "title": "Star Wars",
      "isFavorite": 0,
      "rating": null,
      "watchDate": null,
      "userId": 1,
   },

   {
      "id": 2,
      "title": "21 Grams",
      "isFavorite": 1,
      "rating": 4,
      "watchDate": null,
      "userId": 1,
   },
   ...
]
```

---


## List filtered films

## 🌐 Base URL
* **URL base:** `/api/films/`

## 🛤️ HTTP Method
* **Metodo:** `GET`

## 📖 Description
* **Retrieve all the avaible films of the library filtered by some fields** 

## ⚡ Request query parameter
**filter films by (isFavorite = 1, rating = 5, watchDate = last month or None)**

## 📥 Request body
**None**

## ⚡ Response
**Success response (200 OK): In case of success, returns an array of questions in JSON format**
**Failure response (500 Internal Server Error): In case of failure, return an error message**

## 📤 Response body

```json
[
   {
      "id": 1,
      "title": "Pulp Fiction",
      "isFavorite": 1,
      "rating": 5,
      "watchDate": null,
      "userId": 1,
   },
   ...
]
```

---


## Film by Id

## 🌐 Base URL
* **URL base:** `/api/films/<id>/`

## 🛤️ HTTP Method
* **Metodo:** `GET`

## 📖 Description
* **Retrieve the properties about a film with a given id of the library** 

## ⚡ Request query parameter
**filter film by (id)**

## 📥 Request body
**None**

## ⚡ Response
**Success response (200 OK): In case of success, returns an array of questions in JSON format**
**Failure response (500 Internal Server Error): In case of failure, return an error message**
**Failure response (404 Not Found): In case of failure, return an error message**

## 📤 Response body

```json
[
   {
      "id": 1,
      "title": "Pulp Fiction",
      "isFavorite": 1,
      "rating": 5,
      "watchDate": null,
      "userId": 1,
   }
]
```

---


## Creation of a new Film

## 🌐 Base URL
* **URL base:** `/api/films/`

## 🛤️ HTTP Method
* **Metodo:** `POST`

## 📖 Description
* **Create a new film to add to the library** 

## ⚡ Request query parameter
**None**

## 📥 Request body

```json
[
   {
      "id": 7,
      "title": "Caccia a Ottobre Rosso",
      "isFavorite": 1,
      "rating": 3,
      "watchDate": null,
      "userId": 4,
   }
]
```

## ⚡ Response
**Success response (201 Created): In case of success, returns an array of questions in JSON format**
**Failure response (503 Service Unavailable): In case of failure, return an error message**
**Failure response (404 Not Found): In case of failure, return an error message**

## 📤 Response body
**None**

---


## Updating an exsisting film

## 🌐 Base URL
* **URL base:** `/api/films/<id>/`

## 🛤️ HTTP Method
* **Metodo:** `PUT`

## 📖 Description
* **Updating an existing film of the library** 

## ⚡ Request query parameter
**filter film by (id)**

## 📥 Request body

```json
[
   {
      "id": 7,
      "title": "Caccia a Ottobre Rosso",
      "isFavorite": 0,
      "rating": 5,
      "watchDate": null,
      "userId": 4,
   }
]
```

## ⚡ Response
**Success response (200 Ok): In case of success, returns an array of questions in JSON format**
**Failure response (503 Service Unavailable): In case of failure, return an error message**
**Failure response (404 Not Found): In case of failure, return an error message**
**Failure response (422 Unprocessable Entity): In case of failure, return an error message**

## 📤 Response body
**None**

---


## Updating the rating of an existing film

## 🌐 Base URL
* **URL base:** `/api/films/<id>/rating/`

## 🛤️ HTTP Method
* **Metodo:** `PUT`

## 📖 Description
* **Updating the rating of an existing film of the library** 

## ⚡ Request query parameter
**filter film by (id)**

## 📥 Request body

```json
[
   {
      "rating": 4,
   }
]
```

## ⚡ Response
**Success response (200 Ok): In case of success, returns an array of questions in JSON format**
**Failure response (503 Service Unavailable): In case of failure, return an error message**
**Failure response (404 Not Found): In case of failure, return an error message**
**Failure response (422 Unprocessable Entity): In case of failure, return an error message**

## 📤 Response body
**None**

---


## Deleting a film

## 🌐 Base URL
* **URL base:** `/api/films/<id>/`

## 🛤️ HTTP Method
* **Metodo:** `DELETE`

## 📖 Description
* **Deleting a film of the library** 

## ⚡ Request query parameter
**filter film by (id)**

## 📥 Request body
**None**

## ⚡ Response
**Success response (200 Ok): In case of success, returns an array of questions in JSON format**
**Failure response (503 Service Unavailable): In case of failure, return an error message**
**Failure response (404 Not Found): In case of failure, return an error message**

## 📤 Response body
**None**

---


## Updating favorite field of an existing film

## 🌐 Base URL
* **URL base:** `/api/films/<id>/favorite`

## 🛤️ HTTP Method
* **Metodo:** `PUT`

## 📖 Description
* **Set a film of the library as a favorite one** 

## ⚡ Request query parameter
**filter film by (id)**

## 📥 Request body
```json
[
   {
      "isFavorite": 1,
   }
]
```

## ⚡ Response
**Success response (200 Ok): In case of success, returns an array of questions in JSON format**
**Failure response (503 Service Unavailable): In case of failure, return an error message**
**Failure response (404 Not Found): In case of failure, return an error message**
**Failure response (422 Unprocessable Entity): In case of failure, return an error message**

## 📤 Response body
**None**

---

## ⚠️ Attenzione

Progetto individuale, non necessaria creazione di branch se non per gestire singole feature.