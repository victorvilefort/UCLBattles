var express = require("express");
var router = express.Router();

var mockPlayerController = require("../controllers/mockPlayerController");

router.get("/buscar/:id", function (req, res){
    mockPlayerController.buscarPorId(req, res)
})

module.exports = router;