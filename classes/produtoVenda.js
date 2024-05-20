export default class ProdutoVenda{
    constructor(id, nome, preco, descricao, quantidade = 0, quantidadeVendida = 0){
        this.id = id;
        this.nome = nome;
        this.precoProduto = preco / 100;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.quantidadeVendida = quantidadeVendida;
        this.calcularPrecoFinal();
    }

    adicionarUm(){
        this.quantidade++;
        this.calcularPrecoFinal();
    }

    tirarUm(){
        if(this.quantidade == 0) return;
        this.quantidade--;
        this.calcularPrecoFinal();
    }

    calcularPrecoFinal(){
        this.precoFinal = this.precoProduto * this.quantidade;
        return this.precoFinal;
    }
}