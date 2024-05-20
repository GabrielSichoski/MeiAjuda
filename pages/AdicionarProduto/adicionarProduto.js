import { useEffect, useRef, useState } from "react";
import { Alert, TouchableOpacity, Text, TextInput, ToastAndroid, View } from "react-native";
import { FakeCurrencyInput } from "react-native-currency-input";
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import s from "./styles";
import ProdutoService from "../../services/produtoService";
import {colors} from "../../variables";
import ModalSimples from "../../components/modalSimples";

const AdicionarProduto = ({route, navigation}) =>{
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const produto = useRef(route?.params?.produto).current;
    const valorRef = useRef();
    const descricaoRef = useRef();
    const produtoService = ProdutoService();

    useEffect(() => {
        if(produto){
            navigation.setOptions({title: "Editar produto"});
            setNome(produto.nome);
            setDescricao(produto.descricao);
            setPreco(produto.precoProduto);
        }
    },[])

    const salvar = () => {
        if(nome == ""){
            Alert.alert("Campos obrigatórios", "O nome é obrigatório.");
            return;
        }else if(preco == null){
            Alert.alert("Campos obriaatórios", "O preço é obrigatório.");
            return;
        }

        if(produto){
            produtoService.updateById(produto.id, nome, preco, descricao)
            .then(res => {
                ToastAndroid.show("Produto editado com sucesso!", ToastAndroid.SHORT);
                navigation.pop();
            })
            .catch(err => {
                Alert.alert("Erro", "Não foi possível editar o produto devido a um erro.");
                console.log(err);
            });
        }else
            produtoService.add(nome, preco, descricao)
            .then(res => {
                ToastAndroid.show('Produto adicionado com sucesso!', ToastAndroid.SHORT);
                navigation.pop();
            })
            .catch(err => {
                Alert.alert("Erro", "Não foi possível adicionar o produto devido a um erro.");
                console.log(err);
            });
    }

    const excluir = () => {
        produtoService.deleteById(produto.id)
        .then(res => {
            ToastAndroid.show("Produto excluido com sucesso.", ToastAndroid.SHORT);
            navigation.pop();
        })
        .catch(err => {
            ToastAndroid.show("Não foi possível excluir o produto devido a um erro.", ToastAndroid.SHORT);
            console.log(err);
        })
        .finally(() => setModalVisible(false));
    }

    return(<View style={s.tudo}>
        <View style={s.containers}>
            <Text style={s.labels}>Nome*</Text>
            <TextInput
                value={nome}
                placeholder="EX.: Milkshake simples..."
                numberOfLines={1}
                multiline={false}
                blurOnSubmit={false}
                returnKeyType="next"
                onSubmitEditing={() => valorRef.current.focus()}
                onChangeText={(value) => setNome(value)}
                style={s.inputNome}
            />
        </View>

        <View style={s.containers}>
            <Text style={s.labels}>Valor do produto</Text>
            <FakeCurrencyInput
                ref={valorRef}
                returnKeyType="next"
                onSubmitEditing={() => descricaoRef.current.focus()}
                blurOnSubmit={false}
                prefix="R$"
                separator=","
                delimter="."
                precision={2}
                minValue={0}
                value={preco}
                keyboardType="numeric"
                containerStyle={s.containerInputValor}
                style={s.inputValor}
                onChangeValue={(value) => setPreco(value || 0)}
            />
        </View>

        <View style={s.containers}>
            <Text style={s.labels}>Descrição</Text>
            <TextInput
                placeholder="Milkshake com duas colheres de sorvete..."
                numberOfLines={5}
                multiline={true}
                onChangeText={(value) => {setDescricao(value)}}
                style={s.inputObservacoes}
                value={descricao}
                ref={descricaoRef}
            />
        </View>

        <View style={s.botoesContainer}>
            {produto?
                <TouchableOpacity 
                    style={[s.botoes, s.botaoExcluir]}
                    onPress={() => setModalVisible(true)}
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
            modalVisivel={modalVisible}
            setModalVisivel={setModalVisible}
            onPressConfirmar={excluir}
        />
    </View>)
}

export default AdicionarProduto;