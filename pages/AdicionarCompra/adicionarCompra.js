import { useEffect, useRef, useState } from "react";
import { Alert, TouchableOpacity, Text, TextInput, ToastAndroid, View } from "react-native";
import { FakeCurrencyInput } from "react-native-currency-input";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { MaterialIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import s from "./styles";
import CompraService from "../../services/compraService";
import { formataNumero } from "../../variables";
import ModalSimples from "../../components/modalSimples";

const AdicionarCompra = ({route, navigation}) =>{
    const [preco, setPreco] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState(new Date());
    const [modalExcluirVisible, setModalExcluirVisible] = useState(false);
    const id = useRef(route?.params?.id).current;
    const compraService = CompraService();

    useEffect(() => {
        if(id){
            navigation.setOptions({title: "Editar gasto"});
            getById();
        }
    }, [])

    const getById = () => {
        compraService.getById(id).then(res => {
            setPreco(res.valor);
            setDescricao(res.descricao);
            setData(res.data);
        })
    }

    const salvar = () => {
        compraService.add(preco, descricao, data)
            .then(res => {
                navigation.pop();
                ToastAndroid.show("Compra salva com sucesso", ToastAndroid.SHORT);
            })
            .catch(err => {
                console.log(err);
                Alert.alert("Erro", "Não foi possivel adicionar a compra devido a um erro.");
            });
    }

    const excluir = () => {
        compraService.deleteById(id)
            .then(res => {
                ToastAndroid.show("Compra excluida com sucesso.", ToastAndroid.SHORT);
                navigation.pop();
            })
            .catch(err => { 
                Alert.alert("Não foi possível excluir a compra devido a um erro.");
                console.log(err);
            });
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

    const modalDataHora = (modo, onChange) =>{
        DateTimePickerAndroid.open({
            value: data, 
            onChange,
            mode: modo,
            is24Hour: true
        });
    }

    return(<View style={s.tudo}>
        <View style={s.containers}>
            <Text style={s.nomeInput}>
                Valor da compra
            </Text>
            <FakeCurrencyInput
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

        <View style={s.containerDataHora}>
            <View style={s.containerData}>
                <MaterialIcons name="date-range" onPress={abrirData} style={s.iconesDataHora} />
                <TouchableOpacity onPress={abrirData} style={s.inputDataHora}>
                    <Text style={s.data}>{data.getDate()}/{data.getMonth() + 1}/{data.getFullYear()}</Text>
                </TouchableOpacity>
            </View>
    
            <View style={s.containerData}>
                <MaterialIcons name="alarm" onPress={abrirHora} style={s.iconesDataHora}/>
                <TouchableOpacity onPress={abrirHora} style={s.inputDataHora}>
                    <Text style={s.data}>{formataNumero(data.getHours())}:{formataNumero(data.getMinutes())}</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={s.containers}>
            <Text style={s.nomeInput}>
                Observações
            </Text>
            <TextInput
                placeholder="Insira aqui as observações da compra..."
                numberOfLines={5}
                multiline={true}
                onChangeText={(value) => {setDescricao(value)}}
                style={s.inputObservacoes}
            />
        </View>
        
        <View style={s.botoesContainer}>
            {id?
                <TouchableOpacity 
                    style={[s.botoes, s.botaoExcluir]}
                    onPress={() => setModalExcluirVisible(true)}
                >
                    <AntDesign name="delete" style={s.iconeBotao} />
                    <Text style={s.textBotao}>EXCLUIR</Text>
                </TouchableOpacity>
            :null}

            <TouchableOpacity 
                style={[s.botoes, s.botaoSalvar]}
                onPress={() => salvar()}
            >
                <FontAwesome5 name="save" style={s.iconeBotao} />
                <Text style={s.textBotao}>SALVAR</Text>
            </TouchableOpacity>
        </View>

        <ModalSimples
            modalVisivel={modalExcluirVisible}
            setModalVisivel={setModalExcluirVisible}
            onPressConfirmar={() => excluir()}
        />

    </View>)
}

export default AdicionarCompra;
