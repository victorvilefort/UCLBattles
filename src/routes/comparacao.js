var express = require("express");
var router = express.Router();

var comparacaoController = require("../controllers/comparacaoController");

router.post("/registrar", function (req, res){
    comparacaoController.registrarComparacao(req, res)
})

router.get("/top-cinco",function (req, res){
    comparacaoController.listarTopCinco(req, res)
});

router.get("/total-comparacoes", function (req,res){
    comparacaoController.mostrarTotalComparacoes(req,res)
})

router.get("/diferenca-overal", function(req,res){
    comparacaoController.buscarDiferencaOveral(req,res)
})
module.exports = router;