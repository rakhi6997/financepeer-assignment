const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var router = express.Router();

const User = require("../models/user");

router.get("/", function (req, res, next) {
    User.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

router.post("/", async (req, res, next) => {
    console.log(req.body, "Creating new entry");
    const admin = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(req.body.password, salt);
    admin.save().then((doc) => res.status(201).json(doc));
});

router.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    const admin = await User.findOne({ username });
    if (admin) {
        const validPassword = await bcrypt.compare(password, admin.password);
        if (validPassword) {
            res.status(200).json(admin);
        } else {
            res.status(401).json({ message: "please check your credentials" });
        }
    }
    else {
        res.status(401).json({ message: "please check your credentials" });
    }
});

// router.put("/:id", function (req, res, next) {
//     User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//         if (err) return next(err);
//         res.json(post);
//     });
// });

// router.delete("/:id", function (req, res, next) {
//     User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//         if (err) return next(err);
//         res.json(post);
//     });
// });

module.exports = router;