const Chapa = require("../model/chapaModel");

module.exports = class chapaController{
    //CREATE
    static async ChapaCreate(req, res) {
        let nome = req.body.nome;
        let quantidade = req.body.quantidade;
        let arquivo_foto = req.body.arquivo_foto;
        let qualidade = req.body.qualidade;
        let preco = req.body.preco;

        const chapa = {
            nome: nome,
            quantidade: quantidade,
            arquivo_foto: arquivo_foto,
            qualidade: qualidade,
            preco: preco
        }

        await Chapa.create(chapa);
        res.json({message: "Chapa cadastrada com sucesso!"});
    }

    //READ - LISTAR
    static async ChapaListar(req, res) {
        const id_chapa = req.params.id;
        if (id_chapa) {
            const chapa = await Chapa.findOne({ where: { id_chapa: id_chapa } });
            res.json(chapa);
        } else {
            const chapas = await Chapa.findAll({ raw: true });
            res.json(chapas);
        }
    }

    //UPDATE
    static async ChapaUpdate(req, res) {
        const id_chapa = req.params.id;
        let nome = req.body.nome;
        let quantidade = req.body.quantidade;
        let arquivo_foto = req.body.arquivo_foto;
        let qualidade = req.body.qualidade;
        let preco = req.body.preco;

        const chapa = {
            nome: nome,
            quantidade: quantidade,
            arquivo_foto: arquivo_foto,
            qualidade: qualidade,
            preco: preco
        };

        await Chapa.update(chapa, { where: { id_chapa: id_chapa } });
        res.json({ message: "Cadastro de chapa atualizado com sucesso! Foram atualizadas as seguintes informações: ", dados: chapa });
    }

    //DELETE
    static async ChapaDelete(req, res) {
        const id_chapa = req.params.id;
        await Chapa.destroy({ where: { id_chapa: id_chapa } });

        res.json({ message: "Chapa excluída com sucesso!" });
    }
}
