import DatabaseService from "../database/databaseService";
import Produto from '../classes/produto';
import ProdutoVenda from "../classes/produtoVenda";

export default function ProdutoService(){
    const db = DatabaseService();

    const add = (nome, valor, descricao = null) => {
        const sql = `INSERT INTO produtos (nome, valor${descricao? ", descricao" : ""})
        values ((?), (?)${descricao? ", (?)" : ""});`;

        let values = [nome, (valor*100)];
        if(descricao) values.push(descricao);
        
        return db.addData(sql, values);
    }

    const updateById = (id, nome, valor, descricao = null) => {
        let values = [nome, (valor*100)];
        let columns = ["nome", "valor"];
        if(descricao) {
            values.push(descricao);
            columns.push("descricao");
        }

        return db.updateById("produtos", id, columns, values);
    }

    const getAll = async () => {
        return mapearProdutos(await db.getAll("produtos", "WHERE ativo = 1"));
    }

    const get = async (termo, escolhidos) => {
        return mapearProdutoVenda(await db.getCustom(`SELECT produtos.id,
            produtos.nome,
            produtos.descricao,
            produtos.valor,
            SUM(produto_venda.quantidade) AS quantidade
        FROM produtos
        LEFT JOIN produto_venda ON produtos.id = produto_venda.id_produto
        WHERE (ativo = 1) AND (
            produtos.id NOT IN (${escolhidos}) AND
            (nome LIKE '%${termo}%' OR
            descricao LIKE '%${termo}%'))
        GROUP BY produtos.id
        ORDER BY quantidade DESC`));
    }

    const getMaisVendidos = async (quantidade) => {
        const sql = `SELECT produtos.id,
            produtos.nome,
            produtos.descricao,
            produtos.valor,
            SUM(produto_venda.quantidade) AS quantidadeVendida
        FROM produtos
        LEFT JOIN produto_venda ON produtos.id = produto_venda.id_produto
        WHERE ativo = 1
        GROUP BY produtos.id
        ORDER BY quantidade DESC
        LIMIT ${quantidade};`;
        return mapearProdutoVenda(await db.getCustom(sql));
    }

    const deleteById = (id) => db.updateById("produtos", id, ["ativo"], 0);

    const mapearProdutos = (produtos) => 
        produtos.map(produto => new Produto(produto.id, produto.nome, produto.valor, produto.descricao));


    const mapearProdutoVenda = (produtos) =>
        produtos.map(produto => new ProdutoVenda(produto.id, produto.nome, produto.valor, produto.descricao, produto.quantidade, produto.quantidadeVendida));
    
    return{
        add,
        get,
        getAll,
        getMaisVendidos,
        updateById,
        deleteById
    }
}