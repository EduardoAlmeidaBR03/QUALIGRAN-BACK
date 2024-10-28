const Chapa = require("../model/chapaModel");

module.exports = class chapaController{
    //CREATE
    static async ChapaCreate(req, res) {
        let nome = req.body.nome;
        let link = req.body.link;
        let qualidade = req.body.qualidade;
        let preco = req.body.preco;

        const chapa = {
            nome: nome,
            link: link,
            qualidade: qualidade,
            preco: preco
        }

        await Chapa.create(chapa);
        res.json({message: "Chapa cadastrada com sucesso!"});
    }

    //READ - LISTAR
    static async ChapaListarid(req, res) {
        const id_chapa = req.params.id;
        if (id_chapa) {
            const chapa = await Chapa.findOne({ where: { id_chapa: id_chapa } });
            res.json(chapa);
        } else {
            const chapas = await Chapa.findAll({ raw: true });
            res.json(chapas);
        }
    }
    // Função para listar todas as chapas
    static async ChapaListar(req, res) {
        try {
            const chapas = await Chapa.findAll({ raw: true });
            res.json(chapas);
        } catch (error) {
            res.status(500).json({ message: "Erro ao listar as chapas", error: error.message });
        }
    }


    //UPDATE
    static async ChapaUpdate(req, res) {
        const id_chapa = req.params.id;
        let nome = req.body.nome;
        let link = req.body.link;
        let qualidade = req.body.qualidade;
        let preco = req.body.preco;

        const chapa = {
            nome: nome,
            link: link,
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
