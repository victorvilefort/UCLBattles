var mockPlayerModel = require("../models/mockPlayerModel");

function buscarPorId(req, res) {
  var id = req.params.id;

  mockPlayerModel.buscarPorId(id).then((resultado) => {
    if (!resultado || resultado.length === 0) {
      return res.status(404).json({ erro: "Jogador não encontrado" });
    }
    res.status(200).json(resultado[0]);
    console.log(resultado[0]);
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ erro: "Erro interno" });
  });
}

module.exports = {
  buscarPorId
};