var express = require("express");
var router = express.Router();

var statsController = require("../controllers/statsController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    statsController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    statsController.autenticar(req, res);
});

module.exports = router;