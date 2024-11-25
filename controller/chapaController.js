const Chapa = require("../model/chapaModel");

module.exports = class chapaController{
    //CREATE
    static async ChapaCreate(req, res) {
        let nome = req.body.nome;
        let link = req.body.link;
        let qualidade = req.body.qualidade;
        let preco = req.body.preco;
        let largura = req.body.largura;
        let altura = req.body.altura;

        const chapa = {
            nome: nome,
            link: link,
            qualidade: qualidade,
            preco: preco,
            largura: largura,
            altura: altura
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

    

    static async ChapaUpdate(req, res) {
        const id_chapa = req.params.id_chapa;
        let nome = req.body.nome;
        let link = req.body.link;
        let qualidade = req.body.qualidade;
        let preco = req.body.preco;
        let largura = req.body.largura;
        let altura = req.body.altura;
    
        const chapa = {
            nome: nome,
            link: link,
            qualidade: qualidade,
            preco: preco,
            largura: largura,
            altura: altura
        };
    
        try {
            await Chapa.update(chapa, { where: { id_chapa: id_chapa } });
            res.json({ message: "Cadastro de chapa atualizado com sucesso!", dados: chapa });
        } catch (error) {
            console.error("Erro ao atualizar chapa:", error);
            res.status(500).json({ message: "Erro ao atualizar chapa!", error: error.message });
        }
    }
    
    

    //DELETE
    static async ChapaDelete(req, res) {
        const id_chapa = req.params.id;
        await Chapa.destroy({ where: { id_chapa: id_chapa } });

        res.json({ message: "Chapa excluída com sucesso!" });
    }
}
