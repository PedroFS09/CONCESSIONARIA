import mysql from "mysql2/promise";
import "dotenv/config";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

async function testarConexao() {
    const conexao = await pool.getConnection();
    try {
        await conexao.query('SELECT 1');
        console.log("Banco de dados conectado com sucesso!");
    } catch (erro) {
        console.error("Não foi possível conectar com o banco!");
        console.error(`Detalhe do erro: ${erro.message}`);
        process.exit(1);
    } finally {
        if (conexao) {
            conexao.release();
        }
    }
}

export { pool, testarConexao };