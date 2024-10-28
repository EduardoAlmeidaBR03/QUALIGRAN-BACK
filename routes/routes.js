////////////////MÓDULOS /////////////////////
const express = require("express");
const router = express.Router();

//////CONTROLLERS
const usuarioController = require("../controller/usuarioController");
const chapaController = require("../controller/chapaController");

////////////////Requisições HTTP Principal /////////////////////
router.get("/", (req, res) => {
    return res.json({ message: "Sistema Qualigran" });
});

////////////////Requisições HTTP Usuario /////////////////////

//POST - CADASTRAR USUÁRIO
router.post("/add_usuario", usuarioController.UsuarioCreate);

//GET - LISTAR USUÁRIOS (com ID opcional)
router.get("/usuarios/:id?", usuarioController.UsuarioListar);

//PUT - ATUALIZAR USUÁRIO
router.put("/usuarios/:id", usuarioController.UsuarioUpdate);

// DELETE - EXCLUIR USUÁRIO
router.delete("/usuarios/:id", usuarioController.UsuarioDelete);

// POST - LOGIN (VERIFICAR LOGIN DO USUÁRIO)
router.post("/login", usuarioController.UsuarioVerificaLogin);

/////////////////Requisições Produto /////////////////////

//POST - CADASTRAR CHAPA
router.post("/add_chapa", chapaController.ChapaCreate);

//GET - LISTAR CHAPAS (com ID opcional)
router.get("/chapas/:id?", chapaController.ChapaListar);

module.exports = router;
