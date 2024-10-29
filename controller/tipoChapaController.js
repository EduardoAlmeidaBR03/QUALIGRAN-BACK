const tipoChapa = require("../model/tipoChapaModel");

module.exports = class tipoChapaController {
    
    //CREATE
    static async tipoChapaCreate(req, res) {
        try {
            const { nome, preco } = req.body; // Campos ajustados ao modelo
            const novaTipoChapa = { nome, preco };

            await tipoChapa.create(novaTipoChapa);
            res.json({ message: "Tipo de Chapa cadastrada com sucesso!", tipoChapa: novaTipoChapa });
        } catch (error) {
            res.status(500).json({ message: "Erro ao cadastrar tipo de chapa", error: error.message });
        }
    }

    //READ - LISTAR
    static async tipoChapaListar(req, res) {
        const id_tipochapa = req.params.id;
        if (id_tipochapa) {
            const tipochapa = await tipoChapa.findOne({ where: { id_tipochapa: id_tipochapa } });
            res.json(tipochapa);
        } else {
            const tipochapas = await tipoChapa.findAll({ raw: true });
            res.json(tipochapas);
        }
    }

    //UPDATE
    static async tipoChapaUpdate(req, res) {
        try {
            const id_tipochapa = req.params.id; // Campo ajustado ao model
            const { nome, preco } = req.body; // Campos ajustados ao modelo

            const tipoChapaAtualizada = { nome, preco };

            const resultado = await tipoChapa.update(tipoChapaAtualizada, { where: { id_tipochapa } });
            
            if (resultado[0] > 0) {
                res.json({ message: "Cadastro de tipo de chapa atualizado com sucesso!", tipoChapa: tipoChapaAtualizada });
            } else {
                res.status(404).json({ message: "Tipo de chapa não encontrada ou nenhum campo atualizado" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar tipo de chapa", error: error.message });
        }
    }

    //DELETE
    static async tipoChapaDelete(req, res) {
        try {
            const id_tipochapa = req.params.id; // Campo ajustado ao model

            const resultado = await tipoChapa.destroy({ where: { id_tipochapa } });
            
            if (resultado) {
                res.json({ message: "Tipo de chapa excluída com sucesso!" });
            } else {
                res.status(404).json({ message: "Tipo de chapa não encontrada" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao excluir tipo de chapa", error: error.message });
        }
    }
}
