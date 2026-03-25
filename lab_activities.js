"use strict";

import dayjs from "dayjs";
import sqlite from "sqlite3";

const db = new sqlite.Database("films.db", (err) => {
  if (err) throw err;
})

function Film (id, title, fav=0, rating, date, user_id=1) {
  this.id = id;
  this.title = title;
  this.fav = fav;
  this.rating = rating ?? undefined;
  this.date = dayjs(date) ?? undefined;
  this.user_id = user_id;
}

function FilmLibrary (text) {
  this.text = text
  this.library = [];

  this.addFilm = (film) => {
    this.library.push(film);
  }

  this.toString = () => {

    if (this.library.length === 0) {
      return `La libreria "${this.text}" è vuota.`;
    }
    
    const list = this.library.map(film => {
      return `Id: "${film.id}", Title: "${film.title}", Favorite: "${film.fav}", Watch date: "${film.date}", Rating: "${film.rating}", User id: "${film.user_id}"`; 
    });

    console.log(`=== ${this.text.toUpperCase()} ===\n` + list.join('\n'));

  }

  this.getAllFilms = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT films.* from films";
      const films = [];
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          films.push(rows);
          resolve(films);
        }
      });
    });
  }

  this.getFavFilms = () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT films.* from films WHERE films.isFavorite";
      const films = [];
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          films.push(rows);
          resolve(films);
        }
      });
    });
  }

  this.getBeforeDateFilms = (date) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT films.* from films WHERE films.watchDate < ?";
      const films = [];
      db.all(sql, [date.format("YYYY-MM-DD")], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          films.push(rows);
          resolve(films);
        }
      });
    });
  }

  this.getNameFilms = (film_name) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT films.* from films WHERE films.title like ?";
      const films = [];
      db.all(sql, ['%' + film_name + '%'], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          films.push(rows);
          resolve(films);
        }
      });
    });
  }

  this.insertFilm = (film) => {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO films(id, title, isFavorite, rating, watchDate, userId) VALUES (?,?,?,?,?,?)";
      db.run(sql, [film.id, film.title, film.fav, film.rating, film.date.format("YYYY-MM-DD"), film.user_id], function(err) {
        if(err) {
          console.log("errore di inserimento del film");
          reject (err);
        } else {
          resolve("film inserito correttamente");
        }
      });
    });
  }

  this.deleteFilm = (film) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM films WHERE films.id = ?";
      db.run(sql, [film.id], function(err) {
        if(err) {
          console.log("errore di cancellazione del film");
          reject (err);
        } else {
          resolve("film cancellato correttamente");
        }
      });
    });
  }

  this.deleteWatchDate = (null_val) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE films SET watchDate=?";
      db.run(sql, [null_val], function(err) {
        if(err) {
          console.log("errore di cancellazione dati della colonna watchDate");
          reject (err);
        } else {
          resolve("cancellati correttamente i dati della colonna watchDate");
        }
      });
    });
  }

}

const film1 = new Film(6, 'Chi trova un amico trova un tesoro', 1, 4, dayjs('2019-12-27T16:00'), 3);
const film2 = new Film(7, 'Caccia a Ottobre rosso', 1, 3, dayjs('2023-12-24T11:00'), 4);
const film3 = new Film(8, '50 sfumature di grigio', 0, 1, dayjs('2022-09-12T16:00'), 1);
const film4 = new Film(9, 'Interstellar', 1, 5, dayjs('2022-06-29T22:00'), 2);

const library = new FilmLibrary("Libreria dei film");

library.addFilm(film1);
library.addFilm(film2);
library.addFilm(film3);
library.addFilm(film4);

//library.toString();
// console.log(library.getAllFilms())

async function main() {
  const library_db = new FilmLibrary("Libreria dei film da database");
  
  const date = dayjs('2026-03-11')
  const film_name = '21'
  const val = null
  // console.log(await library_db.getAllFilms());
  // console.log(await library_db.getFavFilms());
  // console.log(await library_db.getBeforeDateFilms(date));
  // console.log(await library_db.getNameFilms(film_name));
  // console.log(await library_db.insertFilm(film2));
  // console.log(await library_db.deleteFilm(film1));
  console.log(await library_db.deleteWatchDate(val));

}

main();


