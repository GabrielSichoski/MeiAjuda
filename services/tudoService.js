import DatabaseInit from "../database/databaseInit";
import DatabaseService from "../database/databaseService";

export default function TudoService(){
    const db = DatabaseService();
    const dbInit = DatabaseInit();

    const apagarDados = async () => {
        let sqls = [`DROP TABLE IF EXISTS produto_venda;`,
        `DROP TABLE IF EXISTS produtos;`,
        `DROP TABLE IF EXISTS vendas;`,
        `DROP TABLE IF EXISTS compras;`];

        await db.arraySQL(sqls);
        return await dbInit.openAndInitDb();
    }

    return{
        apagarDados
    }
}