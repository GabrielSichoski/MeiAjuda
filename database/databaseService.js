import { DatabaseConnection } from "./databaseConnection";

const db = DatabaseConnection.getConnection();

export default function DatabaseService() {

    const addData = (query, params) => {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(query,
                params, 
                (_, { insertId }) => {
                    console.log("id insert: " + insertId);
                    resolve(insertId)
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            }));
    }

    const deleteById = (table, id) => {
        return new  Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`delete from ${table} where id = ?;`, [id], (_, { rows }) => {
                    resolve(true);
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            }));
    }

    const deleteByColumn = (table, column, value) => {
        return new  Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`delete from ${table} where ${column} = ?;`, [value], (_, { rows }) => {
                    resolve(true);
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                    console.log(txError);
            }));
    }

    const updateById = (table, id, columns, params) => {
        if(columns.length != params.length){
            console.log("Erro ao atualizar: número de valores diferente do número de colunas.");
        }

        let colVal = "";
        for(var i = 0; i < columns.length; i++){
            colVal += `${columns[i]} = ?`;
            if((i+1) < columns.length) colVal += ", ";
        }

        const sql = `UPDATE ${table}
        SET ${colVal}
        WHERE id = ${id};`;

        return new Promise((resolve, reject) =>db.transaction(tx => {
                tx.executeSql(sql, params, () => {
                    resolve(true);
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            }));
    }

    const getById = (table, id) => {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where id=?`, [id], (_, { rows }) => {
                console.log(rows._array)
                resolve(rows._array)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);
        }));
    }

    const getAll = (table, where = ";") => {
        return new Promise((resolve, reject) => 
            db.transaction(tx => {
                    console.log(`select * from ${table} ${where}`)
                    tx.executeSql(`select * from ${table} ${where}`, [], 
                        (_, { rows }) => {
                            console.log(rows._array)
                            resolve(rows._array)
                    })
                    , (sqlError) => {console.log(sqlError);}
                }, (txError) => {console.log(txError);}
            ))
    }

    const getCustom = (sql) => {
        return new Promise((resolve, reject) => 
            db.transaction(tx => {
                    console.log(sql);
                    tx.executeSql(sql, [], (_, { rows }) => {
                        console.log(rows._array)
                        resolve(rows._array);
                    }),
                    (sqlError) => {console.log(sqlError)}
                }, (txError) => {console.log(txError)}
            ))
    }

    const arraySQL = (sql) => {
        return new Promise((resolve, reject) => 
        db.transaction(
            tx => {
                    for (var i = 0; i < sql.length; i++) {
                        console.log("execute sql : " + sql[i]);
                        tx.executeSql(sql[i]);
                    }
                    resolve(true);
                }
            , (error) => {
                console.log("error callback : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("transaction complete");
            }
        ));
    }

    return{
        addData,
        deleteById,
        deleteByColumn,
        updateById,
        getById,
        getAll,
        getCustom,
        arraySQL
    }
}
