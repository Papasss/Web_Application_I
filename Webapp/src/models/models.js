import dayjs from "dayjs";

function Film (id, title, isFavorite=0, rating, watchDate, userId=1) {
  this.id = id;
  this.title = title;
  this.isFavorite = isFavorite;
  this.rating = rating ?? undefined;
  this.watchDate = watchDate && dayjs(watchDate);
  this.userId = userId;
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

export {FilmLibrary, Film};