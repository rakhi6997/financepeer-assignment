const express = require("express");
const mongoose = require("mongoose");

var router = express.Router();

const File = require("../models/file");

router.get("/", function (req, res, next) {
  File.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

router.post("/", function (req, res, next) {
  console.log(req.body, "req body");
  const newProduct = new File({
    jsonObj: req.body,
  });
  newProduct.save().then((prods) => res.json(prods));
});

router.put("/:id", function (req, res, next) {
  File.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete("/:id", function (req, res, next) {
  File.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;