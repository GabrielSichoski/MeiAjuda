export default class Produto{
    constructor(id = null, nome, preco, descricao){
        this.id = id;
        this.nome = nome;
        this.preco = preco / 100;
        this.descricao = descricao;
    }
}