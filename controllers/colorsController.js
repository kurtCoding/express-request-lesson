const express = require("express");
const colors = express.Router();
const colorsArray = require("../models/color.js");

// Index
colors.get("/", (req, res) => {
    console.log("in Index Route")
  res.json(colorsArray);
});

// Show
colors.get("/:id", (req, res) => {
  const { id } = req.params;
  const color = colorsArray.find((color) => color.id === Number(id));
  if (color) {
    res.send(color);
  } else {
    res.send("Cannot find any colors with this id: " + id);
  }
});

const checkForColorKey = (req, res, next) => {
    if (req.body.hasOwnProperty("name")) {
     return next();
    } else {
      res.send("You must supply an object with a key of `name`");
    }
  };

  const justSayHi = (req, res, next) => {
    console.log("Hi");
    return next();
  }

// CREATE
colors.post("/", (req, res) => {
    // /colors
    console.log("This is req.body", req.body);
    const newColor = {...req.body, id: colorsArray.length + 1}
    colorsArray.push(newColor);
    res.json(colorsArray[colorsArray.length - 1]);
  });

module.exports = colors;
