import { useEffect, useState } from "react";
import { Alert, TouchableOpacity, Text, View, FlatList, ToastAndroid, ScrollView } from "react-native";
import { FakeCurrencyInput } from "react-native-currency-input";
import { Ionicons, FontAwesome5, Octicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import s from "./styles";
import {colors, formataReal} from "../../variables";
import { useUser } from "../../storage/userContext";
import LucroService from "../../services/lucroService";
import ProdutoService from "../../services/produtoService";
import VendaService from "../../services/vendaService";
import ProdutoVenda from "../../classes/produtoVenda";
import ModalVendaRapida from "../../components/modalVendaRapida";

export default function Home({navigation}){
    const {nome, saudacao} = useUser();
    const [total, setTotal] = useState(0);
    const [mensal, setMensal] = useState(0.00);
    const [produtos, setProdutos] = useState([]);
    const [valor, setValor] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [modalVendaRapida, setModalVendaRapida] = useState(false);
    
    const lucroService = LucroService();
    const produtoService = ProdutoService();
    const vendaService = VendaService();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getTotal();
            getMensal();
            produtosCompraRapida();
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        calcularValor();
    }, [produtos]);

    const produtosCompraRapida = () => {
        produtoService.getMaisVendidos(3).then(res => {
            setProdutos(res);
        }).catch(err => {
            Alert.alert("Erro", "Ocorreu um erro ao buscar os produtos para venda rápida.");
        });
    }

    const getTotal = () => {
        lucroService.getTotal().then(res => {
            setTotal(res[0].lucro / 100);
        }).catch(err => {
            Alert.alert("Erro", "Não foi possível retornar o lucro total devido a um erro.");
            console.log(err)
        });
    }

    const getMensal = () => {
        const inicio = new Date();
        inicio.setDate(1);
        const fim = new Date();
        lucroService.getTotalPorPeriodo(inicio.getTime()/1000, fim.getTime()/1000).then(res => {
            setMensal(res[0].lucro/100);
        }).catch(err => {
            Alert.alert("Erro", "Não foi possivel retornar o lucro mensal devido a um erro.");
            console.log(err);
        })
    }

    const maisUm = (id) => {
        let listaNova = copiaArrayProdutos();
        listaNova.find((produto) => produto.id == id).adicionarUm();
        setProdutos(listaNova);
    }

    const menosUm = (id) => {
        let listaNova = copiaArrayProdutos();
        const i = listaNova.findIndex((produto) => produto.id == id);
        listaNova[i].tirarUm();
        setProdutos(listaNova);
    }

    const calcularValor = () => {
        let valorProd = 0;
        produtos.map((produto) => valorProd += produto.calcularPrecoFinal());
        setValor(valorProd);
    }

    const mudarValor = (valorNovo) => {
        setDesconto(valorNovo - valor);
        setValor(valorNovo);
    }

    const salvarVenda = (dataVenda, valorVenda, descontoVenda, produtosVenda) => {
        if(!produtosVenda.length){
            Alert.alert("Erro", "Não é possível adicionar uma venda sem produtos.");
            return;
        }
        vendaService.add(dataVenda, valorVenda, descontoVenda, null, produtosVenda).then(res => {
            limparVenda();
            setModalVendaRapida(false);
            ToastAndroid.show("Venda adicionada com sucesso!", ToastAndroid.SHORT);
        }).catch(err => {
            Alert.alert("Erro", "Não foi possível salvar a venda devido a um erro.");
            console.log(err)
        });
    }

    const limparVenda = () => {
        setDesconto(0);
        setValor(0);
        produtosCompraRapida();
    }

    const copiaArrayProdutos = () => 
        JSON.parse(JSON.stringify(produtos)).map(item => new ProdutoVenda(item.id, item.nome, item.precoProduto*100, item.descricao, item.quantidade));

    const abrirVendaRapida = () => {
        if(produtos.filter(prod => prod.quantidade).length){
            setModalVendaRapida(true);
        }else{
            Alert.alert("Erro", "Não é possível adicionar uma venda sem produtos.");
        }
    }

    const irParaConfiguracoes   = () => navigation.navigate("Configuracoes");
    const irParaAdicionarCompra = () => navigation.navigate("AdicionarCompra");
    const irParaConsultarLucro  = () => navigation.navigate("ConsultarLucro");
    const irParaMeusProdutos    = () => navigation.navigate("MeusProdutos");
    const irParaAdicionarVenda  = () => navigation.navigate("AdicionarVenda");
    const adicionarProduto = () => navigation.navigate("AdicionarProduto");

    return (
        <ScrollView style={s.container}>
            <View style={s.headerBemVindo}>
                <Text style={s.textoBemVindo}>{saudacao}{nome}</Text>
                <Ionicons onPress={() => irParaConfiguracoes()} name="settings-outline" size={24} color="#fff" />
            </View>

            <View style={s.containerLucro}>
                <Text style={s.tituloLucro}>Seu lucro total é de:</Text>
                <Text style={[s.valorLucro, {
                    color: total > 0 ? colors.green : 
                           total < 0 ? colors.red : colors.black
                    }]}>{formataReal(total)}</Text>
                <Text style={s.lucroMensal}>Seu lucro mensal é de {formataReal(mensal)}</Text>
            </View>

            <View style={{marginVertical: 40}}>
                <Text style={s.textoVendaRapida}>Venda rápida</Text>
                <FlatList
                    horizontal
                    data={produtos}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) =>
                        <View style={s.itemProduto}>
                            <View>
                                <Text style={s.nomeProd}>{item.nome}</Text>
                                <Text><Text style={s.bold}>Un.:</Text> {formataReal(item.precoProduto)}</Text>
                                <Text><Text style={s.bold}>Total:</Text> {formataReal(item.precoFinal)}</Text>
                            </View>

                            <View style={s.quantidade}>
                                <Text onPress={() => menosUm(item.id)} style={s.maisMenos}>-</Text>

                                <Text>{item.quantidade}</Text>
                            
                                <Text onPress={() => maisUm(item.id)} style={s.maisMenos}>+</Text>
                            </View>
                        </View>
                    }
                    ListEmptyComponent={
                        <TouchableOpacity style={s.containerSemProduto} onPress={adicionarProduto}>
                            <Text style={s.txtSemProdutos}>Não foram encontrados produtos...{"\n"}Adicione produtos para começar a cadastrar suas vendas!</Text>
                            <MaterialIcons name="add-box" style={s.iconeSemProdutos}/>
                        </TouchableOpacity>
                    }
                />
                {produtos.length ?
                    <View style={s.containerValorSalvar}>
                        <FakeCurrencyInput
                            prefix="R$"
                            separator=","
                            delimter="."
                            precision={2}
                            minValue={0}
                            value={valor}
                            keyboardType="numeric"
                            containerStyle={s.containerCampoValor}
                            style={s.campoValor}
                            onChangeValue={(value) => mudarValor(value || 0)}
                        />
                        <TouchableOpacity style={s.botaoSalvar} onPress={() => abrirVendaRapida()}>
                            <Text style={s.txtBotaoSalvar}>SALVAR</Text>
                        </TouchableOpacity>
                    </View>
                :null}
            </View>

            <View style={s.linhaBotao}>
                <TouchableOpacity
                    onPress={() => irParaMeusProdutos()}
                    style={[s.botao, s.botaoProdutos]}
                >
                    <AntDesign name="tags" style={s.iconeBotao} />
                    <Text style={s.txtBotao}>Meus produtos</Text>
                </TouchableOpacity>
            </View>

            <View style={s.linhaBotao}>
                <TouchableOpacity
                    onPress={() => irParaAdicionarVenda()}
                    style={[s.botao, s.botaoVendas]}
                    >
                    <FontAwesome5 name="hand-holding-usd" style={s.iconeBotao} />
                    <Text style={s.txtBotao}>Adicionar venda</Text>
                </TouchableOpacity>
            </View>

            <View style={s.linhaBotao}>
                <TouchableOpacity
                    onPress={() => irParaAdicionarCompra()}
                    style={[s.botao, s.botaoCompras]}
                >
                    <FontAwesome5 name="shopping-cart" style={s.iconeBotao} />
                    <Text style={s.txtBotao}>Adicionar gasto</Text>
                </TouchableOpacity>
            </View>
            
            <View style={s.linhaBotao}>
                <TouchableOpacity
                    onPress={() => irParaConsultarLucro()}
                    style={[s.botao, s.botaoLucros]}
                >
                    <Octicons name="graph" style={s.iconeBotao} />
                    <Text style={s.txtBotao}>Histórico de lucros</Text>
                    </TouchableOpacity>
            </View>

            <ModalVendaRapida 
                modalVisivel={modalVendaRapida}
                setModalVisivel={setModalVendaRapida}
                onPressConfirmar={salvarVenda}
                maisUm={maisUm}
                menosUm={menosUm}
                produtos={produtos.filter((produto) => produto.quantidade > 0)}
                valor={valor}
                desconto={desconto}
            />
        </ScrollView>
    );
}
  