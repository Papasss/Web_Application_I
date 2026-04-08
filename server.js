"use strict";

import express from "express";
import morgan from "morgan";
import {Film, FilmLibrary} from "./lab_activities.js";
import { check, validationResult } from "express-validator";

const app = express();
const port = 3001;

// middlewares
app.use(morgan('dev'));
app.use(express.json());


// GET /api/films
app.get("/api/films", (req, res) => {
  FilmLibrary.getAllFilms(req.params.filter)
    .then(films => res.json(films))
    .catch(() => res.status(500).end());
});


// GET /api/films/<id>
app.get("/api/films/:id", async (req, res) => {
  try {
    const question = await getIdFilms(req.params.id);
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

  const film = req.body;

  try {
    const id = await insertFilm(film);
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

  const film = req.body;
  film.id = req.params.id;

  try {
    await updateFilm(film);
    res.status(200).end();
  } catch {
    res.status(503).json({"error": `Impossible to update film #${req.params.id}.`});
  }
});

// POST /api/answers/<id>/vote
app.post("/api/answers/:id/vote", [
  check("vote").notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(422).json({errors: errors.array()});
  }

  const answerId = req.params.id;
  try {
    const num = await voteAnswer(answerId, req.body.vote);
    if(num === 1)
      res.status(204).end();
    else
      throw new Error(`Error in casting a vote for answer #${answerId}`);
  }
  catch(e) {
    res.status(503).json({error: e.message});
  }
})


// start the server
app.listen(port, () => {console.log(`API server started at http://localhost:${port}`)});