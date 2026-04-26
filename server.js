"use strict";

import express from "express";
import morgan from "morgan";
import {Film, FilmLibrary} from "./lab_activities.js";
import { check, validationResult } from "express-validator";
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';

const app = express();
const port = 3001;

const papaLibrary = new FilmLibrary("My Film Library");

// middlewares
app.use(morgan('dev'));
app.use(express.json());

passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await getUser(username, password);
  if(!user)
    return cb(null, false, "Incorrect username or password.");
    
  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, {id: user.id, email: user.email, name: user.name});
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: "Not authorized"});
}

app.use(session({
  secret: "PippoBianco001",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate("session"));


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