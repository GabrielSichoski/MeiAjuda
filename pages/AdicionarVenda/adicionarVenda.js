import { useEffect, useRef, useState } from "react";
import { Alert, TouchableOpacity, ScrollView, Text, ToastAndroid, View, TextInput } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { FakeCurrencyInput } from "react-native-currency-input";
import { FontAwesome5, AntDesign, MaterialIcons } from '@expo/vector-icons';
import s from "./styles";
import ProdutoService from "../../services/produtoService";
import {colors, formataNumero, formataReal} from "../../variables";
import ModalSimples from "../../components/modalSimples";
import VendaService from "../../services/vendaService";
import ProdutoVenda from "../../classes/produtoVenda";
import ModalAdicionarProduto from "../../components/modalAdicionarProduto";

const AdicionarVenda = ({route, navigation}) =>{
    const [produtos, setProdutos] = useState([]);
    const [pesquisa, setPesquisa] = useState([]);
    const [data, setData] = useState(new Date());
    const [valorFinal, setValorFinal] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [observacoes, setObservacoes] = useState();
    const [modalExcluirVisible, setModalExcluirVisible] = useState(false);
    const [modalProdutoVisivel, setModalProdutoVisivel] = useState(false);
    const [loadingProduto, setLoadingProduto] = useState(false);
    const id = useRef(route?.params?.id).current;
    const refValorFinal = useRef();
    const refObservacoes = useRef();
    const produtoService = ProdutoService();
    const vendaService = VendaService();

    useEffect(() => {
        if(id){
            navigation.setOptions({title: "Editar venda"});
            getById();
        }else if (!produtos.length){
            setModalProdutoVisivel(true);
        }
    },[])

    useEffect(() => {
        calcularValor();
    }, [produtos, desconto])

    useEffect(() => {
        calcularDesconto();
    }, [valorFinal])

    const getById = () => {
        vendaService.getById(id).then(res => {
            console.log(res)
            setProdutos(res.produtos);
            setData(res.data);
            setValorFinal(res.valor);
            setDesconto(res.desconto);
            setObservacoes(res.observacoes);
        })
    }

    const salvar = () => {
        if(!produtos.length){
            Alert.alert("Sem produtos", "É necessário cadastrar ao menos um produto para salvar a venda!");
            return;
        }

        if(id){
            vendaService.updateById(id, data, valorFinal, desconto, observacoes, produtos)
            .then(res => {
                ToastAndroid.show("Venda editada com sucesso!", ToastAndroid.SHORT);
                navigation.pop();
            })
            .catch(err => {
                Alert.alert("Não foi possível editar a venda devido a um erro.");
                console.log(err);
            });
        }else
            vendaService.add(data, valorFinal, desconto, observacoes, produtos)
            .then(res => {
                ToastAndroid.show('Venda adicionada com sucesso!', ToastAndroid.SHORT);
                navigation.pop();
            })
            .catch(err => {
                Alert.alert("Não foi possível adicionar a venda devido a um erro.");
                console.log(err);
            });
    }

    const pesquisarProdutos = (termo = "") => {
        setLoadingProduto(true);
        let ids = [];
        if(produtos.length) produtos.map(produto => ids.push(produto.id));
        produtoService.get(termo, ids).then(res => {
            setPesquisa(res);
        }).catch(err => {
            Alert.alert("Erro", "Erro ao buscar os produtos");
            console.log(err);
        }).finally(() => setLoadingProduto(false));
    }

    const excluir = () => {
        vendaService.deleteById(id)
            .then(res => {
                ToastAndroid.show("Venda excluida com sucesso.", ToastAndroid.SHORT);
                navigation.pop();
            })
            .catch(err => { 
                Alert.alert("Não foi possível excluir a venda devido a um erro.");
                console.log(err);
            });
    }

    const adicionarProduto = (produto) => {
        setModalProdutoVisivel(false);
        let produtosNova = produtos;
        produtosNova.push(new ProdutoVenda(produto.id,produto.nome, produto.precoProduto*100, produto.descricao, 1));
        setProdutos(produtosNova);
        calcularValor();
    }

    const maisUm = (id) => {
        let listaNova = copiaArrayProdutos();
        listaNova.find((produto) => produto.id == id).adicionarUm();
        setProdutos(listaNova);
        calcularValor();
    }

    const menosUm = (id) => {
        let listaNova = copiaArrayProdutos();
        const i = listaNova.findIndex((produto) => produto.id == id);
        listaNova[i].tirarUm();
        if(listaNova[i].quantidade <= 0) listaNova.splice(i,1);
        setProdutos(listaNova);
        calcularValor();
    }

    const copiaArrayProdutos = () => JSON.parse(JSON.stringify(produtos)).map(item => new ProdutoVenda(item.id, item.nome, item.precoProduto*100, item.descricao, item.quantidade));

    const calcularValor = () => {
        let valorProd = 0;
        if(produtos?.length)
            valorProd = produtos.reduce((total, current) => total + current.calcularPrecoFinal(), 0);
        setValorFinal(valorProd + desconto);
    }

    const calcularDesconto = () => {
        let valorProd = 0;
        if(produtos?.length)
            valorProd = produtos.reduce((total, current) => total + current.calcularPrecoFinal(), 0);
        setDesconto(valorFinal - valorProd);
    }

    const abrirModalProduto = () => {
        pesquisarProdutos();
        setModalProdutoVisivel(true);
    }

    const onChangeData = (event, selectedDate) => {
        if(event.type != "set") return;
        let dia = new Date(data);
        dia.setDate(selectedDate.getDate());
        dia.setMonth(selectedDate.getMonth());
        dia.setFullYear(selectedDate.getFullYear());
        setData(dia);
    }

    const onChangeHora = (event, selectedTime) => {
        if(event.type != "set") return;
        let hora = new Date(data);
        hora.setHours(selectedTime.getHours());
        hora.setMinutes(selectedTime.getMinutes());
        setData(hora);
    }

    const abrirData = () => {
        modalDataHora("date", onChangeData);
    }

    const abrirHora = () => {
        modalDataHora("time", onChangeHora);
    }

    const modalDataHora = (modo, onChange, value) =>{
        DateTimePickerAndroid.open({
            value: value ?? new Date(),
            onChange,
            mode: modo,
            is24Hour: true
        });
    }

    return(<ScrollView style={s.tudo}>

        <View style={[s.containerProdutos, s.containers]}>
            <Text style={s.labels}>Produtos*</Text>
            {produtos?.length? 
                produtos.map(produto => 
                    <View key={produto.id} style={s.itemProduto}>
                        <View style={{flex: 1}}>
                            <Text style={s.nomeProduto}>{produto.nome}</Text>
                            <Text>Un.: {formataReal(produto.precoProduto)}</Text>
                            <Text>Total: {formataReal(produto.precoFinal)}</Text>
                        </View>
                        <View style={s.quantidade}>
                            <TouchableOpacity onPress={() => menosUm(produto.id)} >
                                <Text style={s.maisMenos}>-</Text>
                            </TouchableOpacity>

                            <Text>{produto.quantidade}</Text>
                        
                            <TouchableOpacity onPress={() => maisUm(produto.id)}>
                                <Text style={s.maisMenos}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            :null}

            <View style={s.containerBotaoAdd}>
                <TouchableOpacity style={s.botaoAddProduto} onPress={abrirModalProduto}>
                    <MaterialIcons name="add-box" style={s.iconeAdd} />
                    <Text style={s.textBotaoAdd}>Adicionar produto</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={[s.containerDataHora, s.containers]}>
            <View style={s.itemDataHora}>
                <MaterialIcons name="date-range" onPress={abrirData} style={[s.labels, s.icones]} />
                <TouchableOpacity onPress={abrirData} style={s.inputDataHora}>
                    <Text style={s.data}>{data.getDate()}/{data.getMonth() + 1}/{data.getFullYear()}</Text>
                </TouchableOpacity>
            </View>
    
            <View style={s.itemDataHora}>
                <MaterialIcons name="alarm" onPress={abrirHora} style={[s.labels, s.icones]}/>
                <TouchableOpacity onPress={abrirHora} style={s.inputDataHora}>
                    <Text style={s.data}>{formataNumero(data.getHours())}:{formataNumero(data.getMinutes())}</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={s.containers}>
            <Text style={s.labels}>Observações</Text>
            <TextInput
                placeholder="Insira aqui as observações da venda..."
                numberOfLines={5}
                multiline={true}
                onChangeText={(value) => {setObservacoes(value)}}
                ref={refObservacoes}
                style={s.inputObservacoes}
                value={observacoes}
            />
        </View>
        
        <View style={s.containerInputValor}>
            <Text style={[s.labels, s.labelDesconto]}>Desconto/{"\n"}acréscimo:</Text>
            <FakeCurrencyInput
                prefix="R$"
                separator=","
                delimter="."
                precision={2}
                showPositiveSign={desconto < 0}
                value={desconto}
                keyboardType="numeric"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => refValorFinal.current.focus()}
                containerStyle={s.containerInputValor}
                style={s.inputValor}
                onChangeValue={(value) => setDesconto(value || 0)}
            />
        </View>
        <Text style={s.dica}>ADICIONAR SINAL DE MENOS (-) PARA DESCONTO</Text>

        <View style={s.containerInputValor}>
            <Text style={[s.labels, s.labelValor]}>TOTAL:</Text>
            <FakeCurrencyInput
                prefix="R$"
                separator=","
                delimter="."
                precision={2}
                minValue={0}
                value={valorFinal}
                keyboardType="numeric"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => refObservacoes.current.focus()}
                containerStyle={s.containerInputValor}
                style={s.inputValor}
                onChangeValue={(value) => setValorFinal(value || 0)}
                ref={refValorFinal}
                />
        </View>

        <View style={s.botoesContainer}>
            {id?
                <TouchableOpacity 
                    style={[s.botoes, s.botaoExcluir]}
                    onPress={() => setModalExcluirVisible(true)}
                >
                    <AntDesign name="delete" size={24} color={colors.white} />
                    <Text style={s.textBotao}>EXCLUIR</Text>
                </TouchableOpacity>
            :null}

            <TouchableOpacity 
                style={[s.botoes, s.botaoSalvar]}
                onPress={() => salvar()}
            >
                <FontAwesome5 name="save" size={24} color={colors.white} />
                <Text style={s.textBotao}>SALVAR</Text>
            </TouchableOpacity>
        </View>

        <ModalSimples 
            modalVisivel={modalExcluirVisible}
            setModalVisivel={setModalExcluirVisible}
            onPressConfirmar={() => excluir()}
        />

        <ModalAdicionarProduto
            modalVisivel={modalProdutoVisivel}
            setModalVisivel={setModalProdutoVisivel}
            resultados={pesquisa}
            pesquisar={pesquisarProdutos}
            loading={loadingProduto}
            produtoEscolhido={adicionarProduto}
        />
    </ScrollView>)
}

export default AdicionarVenda;