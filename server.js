"use strict";

import express from "express";
import morgan from "morgan";
import {Film, FilmLibrary} from "./lab_activities.js";
import { check, validationResult } from "express-validator";

const app = express();
const port = 3001;

const papaLibrary = new FilmLibrary("My Film Library");

// middlewares
app.use(morgan('dev'));
app.use(express.json());


// GET /api/films
app.get("/api/films", (req, res) => {
  papaLibrary.getAllFilms(req.query.filter)
    .then(films => res.json(films))
    .catch((err) => res.status(500).json(err).end());
});


// GET /api/films/<id>
app.get("/api/films/:id", async (req, res) => {
  try {
    const id = req.params.id.toString();
    const question = await papaLibrary.getIdFilms(id);
    if(question.error) {
      res.status(404).json(question);
    }
    else res.json(question);
  }
  catch {
    res.status(500).end();
  }
});


// POST /api/films
app.post("/api/films/", [
  check("id").notEmpty(),
  check("title").notEmpty(),
  check("isFavorite").isNumeric(),
  check("rating").isNumeric(),
  check("watchDate").isDate({format: "YYYY-MM-DD", strictMode: true}),
  check("userId").notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({errors: errors.array()});
  }

  const film = new Film(req.body);

  try {
    const id = await papaLibrary.insertFilm(film);
    res.status(201).location(id).end();
  } catch(e) {
    console.error(`ERROR: ${e.message}`);
    res.status(503).json({error: "Impossible to add new film"});
  }
});


// PUT /api/films/<id>
app.put("/api/films/:id", [
  check("id").notEmpty(),
  check("title").notEmpty(),
  check("isFavorite").isNumeric(),
  check("rating").isNumeric(),
  check("watchDate").isDate({format: "YYYY-MM-DD", strictMode: true}),
  check("userId").notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const film = new Film(req.body);
  film.id = req.params.id;

  try {
    await papaLibrary.updateFilm(film);
    res.status(200).end();
  } catch {
    res.status(503).json({"error": `Impossible to update film #${req.params.id}.`});
  }
});


// PUT /api/films/<id>/favorite
app.put("/api/films/:id/favorite", [
  check("isFavorite").isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  try {
    const film = await papaLibrary.getFilm(req.params.id);
    if (film.error)
      return res.status(404).json(film);
    film.favorite = req.body.favorite;
    await papaLibrary.updateFilm(film);
    res.status(200).end();
  } catch {
    res.status(503).json({"error": `Impossible to update film #${req.params.id}.`});
  }
});


// PUT /api/films/<id>/rating
app.put("/api/films/:id/rating", [
  check("rating").isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  try {
    const film = await getFilm(req.params.id);
    if (film.error)
      return res.status(404).json(film);
    film.rating = req.body.rating;
    await papaLibrary.updateFilm(film);
    res.status(200).end();
  } catch {
    res.status(503).json({"error": `Impossible to update film #${req.params.id}.`});
  }
});


// DELETE /api/films/<id>
app.delete('/api/films/:id', async (req, res) => {
  try {
    await papaLibrary.deleteFilm(req.params.id);
    res.status(200).end();
  } catch (err) {
    res.status(503).json({error: `Database error during the deletion of film ${req.params.id}: ${err} `});
  }
});


// start the server
app.listen(port, () => {console.log(`API server started at http://localhost:${port}`)});