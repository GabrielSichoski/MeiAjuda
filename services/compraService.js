import DatabaseService from "../database/databaseService";
import Compra from "../classes/compra";

export default function CompraService(){
    const db = DatabaseService();

    const add = (valor, descricao, data) => {
        const sql = `INSERT INTO compras (valor${descricao ? ", descricao" : ""}${data ? ", data": ""})
        values ((?)${descricao ? ", (?)" : ""}${data ? ", (?)": ""});`;

        var values = [valor*100];
        if (descricao) values.push(descricao);
        if (data) values.push(data.getTime() / 1000);

        return db.addData(sql, values);
    }

    const getById = async (id) => {
        return mapearCompras(await db.getById('compras', id))[0];
    }

    const getAll = async () => {
        return mapearCompras(await db.getAll("compras"));
    }

    const getDatas = async (dataInicio, dataFim) => {
        let sql = ` WHERE data `;
        
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

        const data = await db.getAll("compras", sql);
        console.log(data)
        return mapearCompras(data);
    }

    const mapearCompras = (compras) => 
        compras.map(compra => new Compra(compra.id, compra.valor, compra.descricao, compra.data));

    const deleteById = async (id) => {
        return await db.deleteById("compras", id);
    }

    return {add, getById, getAll, getDatas, deleteById}
}