var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/stats-mockado", function (req, res){
    dashboardControllerController.buscarStatsMockado(req, res)
})

router.get("/stats-player", function(req,res){
    dashboardController.buscarStatsUsuario(req,res)
})

module.exports = router;