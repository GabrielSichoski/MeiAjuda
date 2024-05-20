import DatabaseService from "../database/databaseService";
import Venda from '../classes/venda';
import ProdutoVenda from "../classes/produtoVenda";

`CREATE TABLE IF NOT EXISTS vendas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data DATETIME DEFAULT (DATETIME(CURRENT_TIMESTAMP)),
    valor INTEGER NOT NULL,
    desconto INTEGER,
    observacoes TEXT
);`,
`CREATE TABLE IF NOT EXISTS produto_venda (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_venda INTEGER,
    id_produto INTEGER,
    FOREIGN KEY (id_venda) REFERENCES vendas(id),
    FOREIGN KEY (id_produto) REFERENCES produtos(id)
);`

export default function VendaService(){
    const db = DatabaseService();

    const add = async (data, valor, desconto, observacoes = null, produtos) => {
        let sql = `INSERT INTO vendas (data, valor, desconto${observacoes? ", observacoes" : ""})
        values ((?), (?), (?)${observacoes? ", (?)" : ""});`;

        let values = [data.getTime() / 1000, valor*100, desconto];
        if(observacoes) values.push(observacoes);
        
        const id = await db.addData(sql, values);
        return await inserirProdutoVenda(id, produtos)
    }
    
    const inserirProdutoVenda = async (idVenda, produtos) => {
        let values = []
        let sql = `INSERT INTO produto_venda (id_venda, id_produto, quantidade) values `;
        produtos.forEach((produto, i) => {
            sql += `((?), (?), (?))`;
            values.push(idVenda);
            values.push(produto.id);
            values.push(produto.quantidade);
            if((i+1) < produtos.length) sql += ",";
        });
    
        return await db.addData(sql, values);
    }

    const updateById = async (id, data, valor, desconto, observacoes = null, produtos) => {
        let values = [(data.getTime() / 1000), (valor * 100), desconto];
        let columns = ["data", "valor", "desconto"];
        if(observacoes) {
            values.push(observacoes);
            columns.push("observacoes");
        }

        await db.updateById("vendas", id, columns, values);
        await db.deleteByColumn("produto_venda", "id_venda", id);
        return await inserirProdutoVenda(id, produtos);
    }

    const getAll = async () => {
        return mapearVenda(await db.getAll("vendas"));
    }

    const getDatas = async (dataInicio, dataFim) => {
        let sql = 
        `SELECT 
            vendas.*,
            produto_venda.id AS prodVendaId,
            produto_venda.quantidade,
            produtos.id AS idProduto,
            produtos.valor as valorProd,
            produtos.nome as nomeProd,
            produtos.descricao
        FROM vendas
        JOIN produto_venda
            ON produto_venda.id_venda = vendas.id
        JOIN produtos
            ON produto_venda.id_produto = produtos.id
        WHERE data `;
        
        if(dataInicio && dataFim)
            sql += `BETWEEN ${dataInicio} AND ${dataFim}`;
        else if(dataInicio)
            sql += `>= ${dataInicio}`;
        else if(dataFim)
            sql += `<= ${dataFim}`;
        else {
            const ano = new Date().getFullYear();
            const comecoAno = new Date(`${ano}-01-01T00:00:00Z`).getTime()/1000;
            const fimAno = new Date(`${ano}-12-10T23:59:00Z`).getTime()/1000;
            sql += `BETWEEN ${comecoAno} AND ${fimAno}`;
        }

        return mapearVenda(await db.getCustom(sql));
    }

    const getById = async (id) => {
        const sql = `SELECT 
            vendas.*,
            produto_venda.id AS prodVendaId,
            produto_venda.quantidade,
            produtos.id AS idProduto,
            produtos.valor as valorProd,
            produtos.nome as nomeProd,
            produtos.descricao
        FROM vendas
        JOIN produto_venda
            ON produto_venda.id_venda = vendas.id
        JOIN produtos
            ON produto_venda.id_produto = produtos.id
        WHERE vendas.id = ${id}`;
        return mapearVenda(await db.getCustom(sql))[0];
    }

    const deleteById = async (id) => {
        await db.deleteByColumn("produto_venda", "id_venda", id);
        return await db.deleteById("vendas", id);
    };

    const mapearVenda = (vendas) => {
        let vendasMapeadas = {};
        vendas.map(venda => {
            if(!vendasMapeadas[venda.id]){
                vendasMapeadas[venda.id] = new Venda(venda.id, venda.valor, venda.desconto, venda.observacoes, venda.data);
            }
            vendasMapeadas[venda.id].adicionarProduto(new ProdutoVenda(venda.idProduto, venda.nomeProd, venda.valorProd, venda.descricao, venda.quantidade));
        });
        return Object.values(vendasMapeadas);
    }

    return{
        add,
        getAll,
        updateById,
        deleteById,
        getDatas,
        getById
    }
}