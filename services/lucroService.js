import Lucro from "../classes/lucro";
import DatabaseService from "../database/databaseService";

export default function LucroService(){
    const db = DatabaseService();

    const getTotal = async () => {
        const sql = `SELECT CASE WHEN sum(valor) is null THEN 0 ELSE sum(valor) end - (SELECT sum(valor) FROM compras) AS lucro FROM vendas`;
        const data = await db.getCustom(sql);
        console.log(data);
        return data;
    }

    const getTotalPorPeriodo = async (inicio, fim) => {
        let wheres = "WHERE data " 
        
        if(inicio && fim)
            wheres += `BETWEEN ${inicio} AND ${fim}`;
        else if(inicio)
            wheres += `>= ${inicio}`;
        else if(fim)
            wheres += `<= ${fim}`;
        else
            return getTotal();

        let sql = `SELECT CASE WHEN sum(valor) is null THEN 0 ELSE sum(valor) end - (SELECT sum(valor) FROM compras ${wheres}) AS lucro FROM vendas ${wheres} `;

        const data = await db.getCustom(sql);
        console.log(data)
        return data;
    }

    const getDatas = async (inicio, fim) => {
        let wheres = ["WHERE vendas.data ", "WHERE compras.data "]
        
        if(inicio && fim)
            wheres = wheres.map(where => where += `BETWEEN ${inicio} AND ${fim}`);
        else if(inicio)
            wheres = wheres.map(where => where += `>= ${inicio}`);
        else if(fim)
            wheres = wheres.map(where => where += `<= ${fim}`);
        else
            return getTotal();

        let sql = `SELECT 
        (CASE WHEN sum(vendas.valor) IS null then 0 ELSE sum(vendas.valor) END - 
         CASE WHEN sum(compras.valor) IS null THEN 0 ELSE sum(compras.valor) END) as lucro,
        (CASE WHEN sum(vendas.valor) IS null then 0 ELSE sum(vendas.valor) END) AS vendas,
         CASE WHEN sum(compras.valor) IS null THEN 0 ELSE sum(compras.valor) END AS compras,
         meses.mes AS mes
        FROM (
            SELECT strftime('%m/%Y', datetime(vendas.data, 'unixepoch')) AS mes 
            FROM vendas 
            ${wheres[0]}
            UNION 
            SELECT strftime('%m/%Y', datetime(compras.data, 'unixepoch')) 
            FROM compras
            ${wheres[1]}
        ) AS meses
        LEFT JOIN vendas on strftime('%m/%Y', datetime(vendas.data, 'unixepoch')) = mes
        LEFT JOIN compras on strftime('%m/%Y', datetime(compras.data, 'unixepoch')) = mes
        GROUP BY mes
        ORDER BY mes;`;

        return mapearLucros(await db.getCustom(sql));
    }

    const getTudoPorMes = async () => {
        return mapearLucros(await db.getCustom(`
        SELECT 
        (CASE WHEN sum(vendas.valor) IS null then 0 ELSE sum(vendas.valor) END - 
         CASE WHEN sum(compras.valor) IS null THEN 0 ELSE sum(compras.valor) END) AS lucro,
        (CASE WHEN sum(vendas.valor) IS null then 0 ELSE sum(vendas.valor) END) AS vendas,
         CASE WHEN sum(compras.valor) IS null THEN 0 ELSE sum(compras.valor) END AS compras,
         meses.mes AS mes
        FROM (SELECT strftime('%m/%Y', datetime(vendas.data, 'unixepoch')) AS mes FROM vendas UNION SELECT strftime('%m/%Y', datetime(compras.data, 'unixepoch')) FROM compras) AS meses
        LEFT JOIN vendas on strftime('%m/%Y', datetime(vendas.data, 'unixepoch')) = mes
        LEFT JOIN compras on strftime('%m/%Y', datetime(compras.data, 'unixepoch')) = mes
        GROUP BY mes;`));
    }

    const mapearLucros = (lucros) =>
        lucros.map(lucro => new Lucro(lucro.lucro, lucro.mes, lucro.compras, lucro.vendas));

    return {getTotal, getDatas, getTudoPorMes, getTotalPorPeriodo}
}