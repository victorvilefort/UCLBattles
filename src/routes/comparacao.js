var express = require("express");
var router = express.Router();

var comparacaoController = require("../controllers/comparacaoController");

router.post("/registrar", function (req, res){
    comparacaoController.registrarComparacao(req, res)
})

router.get("/dashboard",function (req, res){
    comparacaoController.listarTopCinco(req, res)
});

router.get("/total/comparacoes", function (req,res){
    comparacaoController.mostrarTotalComparacoes(req,res)
})
module.exports = router;