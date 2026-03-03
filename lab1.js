"use strict";

import dayjs from "dayjs";

function Film (id, title, fav=false, date, rating, user_id=1) {
  this.id = id;
  this.title = title;
  this.fav = fav;
  this.date = dayjs(date) ?? undefined;
  this.rating = rating ?? undefined;
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

}

const film1 = new Film(1, 'Chi trova un amico trova un tesoro', true, dayjs('2019-12-27T16:00'), 4, 2);
const film2 = new Film(2, 'Caccia a Ottobre rosso', true, dayjs('2023-12-24T11:00'), 3, 4);
const film3 = new Film(3, '50 sfumature di grigio', false, dayjs('2022-09-12T16:00'), 1, 1);
const film4 = new Film(4, 'Interstellar', true, dayjs('2022-06-29T22:00'), 5, 2);

const library = new FilmLibrary("Libreria dei film");

library.addFilm(film1);
library.addFilm(film2);
library.addFilm(film3);
library.addFilm(film4);

library.toString();

