const express = require('express');
const router = express.Router();

var db = require("../models");

router.post("/trades", function (req, res) {
    db.Trade.create({
        type: req.body.type,
        user_id: req.body.user_id,
        symbol: req.body.symbol,
        shares: req.body.shares,
        price: req.body.price,
        timestamp: req.body.timestamp
    })
        .then(function (dbTrade) {
            console.log(dbTrade);
            res.redirect("/");
        });
});


router.get("/trades", function (req, res) {
    db.Trade.findAll({

    }).then(function (dbTrade) {
        var hbsObject = {
            trade: dbTrade
        };
        return res.render("index", hbsObject);
    });
});


router.get("/trades/:id", function (req, res) {
    db.Trade.findAll({
        where: {
            id: req.params.id
        }
    }).then(function (dbTrade) {
        var hbsObject = {
            trade: dbTrade
        };
        return res.render("index", hbsObject);
    });
});


router.delete("/trades/:id", function (req, res) {
    db.Trade.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbTrade) {
        res.json(dbTrade);
    });
});


router.put("/trades/:id", function (req, res) {
    db.Trade.update({
        type: req.body.type,
        user_id: req.body.user_id,
        symbol: req.body.symbol,
        shares: req.body.shares,
        price: req.body.price,
        timestamp: req.body.timestamp
    }, {
        where: {
            id: req.body.id
        }
    }).then(function (dbTrade) {
        res.json(dbTrade);
    });
});




module.exports = router;
