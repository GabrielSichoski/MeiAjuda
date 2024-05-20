export default class Lucro{
    constructor(valor, mes, compras = 0, vendas = 0){
        this.valor = valor/100;
        this.mes = mes;
        this.compras = compras ? compras / 100 : 0;
        this.vendas = vendas ? vendas / 100 : 0;
    }
}