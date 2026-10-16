import { pool } from "../database/conexao.js";
 
async function listarLivros(req, res){
    try{
        const [veiculos] = await pool.query("SELECT * FROM veiculos ORDER BY id DESC");
        res.status(200).json(veiculos);
    }catch (erro) {
        console.log("Erro ao listar veículos", erro);
        res.status(500).json({ mensagem: "Erro ao listar veículos" });
    }
}

async function BuscarLivroPorId(req, res){
    try{
        const id = req.params.id;
        const [veiculo] = await pool.query("SELECT * FROM veiculos WHERE id = ?", [id]);

        if (veiculo.length === 0) {
            return res.status(404).json({ mensagem: "Veículo não encontrado" });
        }

        res.status(200).json(veiculo[0]);
    }catch(erro){
        console.log("Erro ao buscar veículo", erro);
        res.status(500).json({ mensagem: "Erro ao buscar veículo" });
    }
}

//POST
async function CadastrarLivros(req, res) {
    try {
        const { modelo, marca, ano, valor, status } = req.body;

        if (!modelo || !marca || !ano || !valor || !status) {
            return res.status(400).json({ mensagem: "Preencha todos os campos obrigatórios" });
        }

        const [resultado] = await pool.query(
            "INSERT INTO veiculos (modelo, marca, ano, valor, status) VALUES (?, ?, ?, ?, ?)",
            [modelo, marca, ano, valor, status]
        );

        res.status(201).json({ mensagem: "Veículo cadastrado com sucesso", id: resultado.insertId });
    } catch (erro) {
        console.log("Erro ao cadastrar veículo:", erro);
        res.status(500).json({ mensagem: "Erro ao cadastrar veículo" });
    }
}

async function AtualizarLivros(req, res) {
    try {
        const id = req.params.id;
        const { modelo, marca, ano, valor, status } = req.body;

        if (!modelo || !marca || !ano || !valor || !status) {
            return res.status(400).json({ mensagem: "Preencha todos os campos para atualizar" });
        }

        const [resultado] = await pool.query(
            "UPDATE veiculos SET modelo = ?, marca = ?, ano = ?, valor = ?, status = ? WHERE id = ?",
            [modelo, marca, ano, valor, status, id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Veículo não encontrado" });
        }

        res.status(200).json({ mensagem: "Veículo atualizado com sucesso" });
    } catch (erro) {
        console.log("Erro ao atualizar veículo", erro);
        res.status(500).json({ mensagem: "Erro ao atualizar veículo" });
    }
}

async function ExcluirLivros(req, res) {
    try {
        const id = req.params.id;
        const [resultado] = await pool.query("DELETE FROM veiculos WHERE id = ?", [id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Veículo não encontrado" });
        }

        res.status(200).json({ mensagem: "Veículo excluído com sucesso" });
    } catch (erro) {
        console.log("Erro ao excluir veículo", erro);
        res.status(500).json({ mensagem: "Erro ao excluir veículo" });
    }
}

export { listarLivros, BuscarLivroPorId, CadastrarLivros, AtualizarLivros, ExcluirLivros };