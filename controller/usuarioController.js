const Usuario = require("../model/usuarioModel");
const bcrypt = require("bcrypt");

module.exports = class usuarioController {
  // CREATE - CADASTRAR USUÁRIO
  static async UsuarioCreate(req, res) {
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    // Gera o hash da senha antes de salvar
    const saltRounds = 10;
    const hashSenha = await bcrypt.hash(senha, saltRounds);

    const usuario = {
      nome: nome,
      email: email,
      senha: hashSenha // Armazena o hash da senha no banco
    }

    await Usuario.create(usuario);
    res.json({ message: "Usuário cadastrado com sucesso!" });
  }

  // READ - LISTAR USUÁRIOS
  static async UsuarioListar(req, res) {
    const id_usuario = req.params.id;
    if (id_usuario) {
      const usuario = await Usuario.findOne({ where: { id_usuario: id_usuario } });
      res.json(usuario);
    } else {
      const usuario = await Usuario.findAll({ raw: true });
      res.json(usuario);
    }
  }

  // UPDATE - ATUALIZAR USUÁRIO
  static async UsuarioUpdate(req, res) {
    const id_usuario = req.params.id;
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    // Gera o hash da nova senha antes de atualizar
    const saltRounds = 10;
    const hashSenha = await bcrypt.hash(senha, saltRounds);

    const usuario = {
      nome: nome,
      email: email,
      senha: hashSenha // Armazena o hash da senha no banco
    };

    await Usuario.update(usuario, { where: { id_usuario: id_usuario } });
    res.json({ message: "Cadastro atualizado com sucesso!", dados: usuario });
  }

  // DELETE - EXCLUIR USUÁRIO
  static async UsuarioDelete(req, res) {
    const id_usuario = req.params.id;
    await Usuario.destroy({ where: { id_usuario: id_usuario } });
    res.json({ message: "Usuário excluído com sucesso!" });
  }

  // LOGIN - VERIFICA LOGIN
  static async UsuarioVerificaLogin(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    const usuario = await Usuario.findOne({ where: { email: email } });

    if (usuario != undefined) {
      // Compara a senha enviada com o hash armazenado
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (senhaValida) {
        res.json({ message: "Login bem-sucedido!" });
      } else {
        res.status(401).json({ message: "Senha incorreta!" });
      }
    } else {
      res.status(404).json({ message: "Usuário não encontrado!" });
    }
  }
}
