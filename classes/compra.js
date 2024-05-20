export default class Compra{
    constructor(id, valor, descricao, data){
        this.id = id;
        this.valor = valor/100;
        this.descricao = descricao;
        this.data = new Date(data*1000);
    }
}