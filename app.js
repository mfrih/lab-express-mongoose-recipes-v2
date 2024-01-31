const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model.js");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res, next) => {
  try {
    const title = req.body.title;
    const instructions = req.body.instructions;
    const level = req.body.level;
    const ingredients = req.body.ingredients;
    const image = req.body.image;
    const duration = req.body.duration;
    const isArchived = req.body.isArchived;
    const created = req.body.created;
    const myRecipe = {
      title,
      instructions,
      level,
      ingredients,
      image,
      duration,
      isArchived,
      created,
    };
    const createdRecipe = await Recipe.create(myRecipe);
    res.status(201).json({
      message: "Success - Recipe created",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Cannot create recipe", error: error.message });
  }
});

//  Iteration 4 - Get All Recipes
app.get("/recipes", async (req, res, next) => {
  try {
    const AllRecipes = await Recipe.find({});
    res.json(AllRecipes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Cannot retrieve recipes", error: error.message });
  }
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
