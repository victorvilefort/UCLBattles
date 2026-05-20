var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/dados-grafico", function (req, res){
    dashboardController.buscarDadosParaPlotar(req, res)
})

module.exports = router;