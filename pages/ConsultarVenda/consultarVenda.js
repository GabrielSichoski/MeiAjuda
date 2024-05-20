import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, TouchableOpacity, RefreshControl, Text, ToastAndroid, View } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { LineChart } from "react-native-chart-kit";
import { MaterialIcons } from '@expo/vector-icons';
import s from "./styles";
import {colors, dimensions, formataNumero, formataReal} from "../../variables";
import ModalSimples from "../../components/modalSimples";
import VendaService from "../../services/vendaService";

export default function ConsultarVendas({navigation}){
    
    const mesPassado = () => {
        const data = new Date();
        data.setMonth(data.getMonth()-1);
        return data;
    }

    const [dataInicio, setDataInicio] = useState(mesPassado());
    const [dataFim, setDataFim] = useState(new Date());
    const [refreshing, setRefreshing] = useState(false);
    const [vendas, setVendas] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalVisivel, setModalVisivel] = useState(false);
    const [selectedVenda, setSelectedVenda] = useState();
    const [data, setData] = useState();
    
    const vendaService = VendaService();
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          get();
        });
        return unsubscribe;
    }, [navigation]);

    const get = () =>{
        var secInicial = (dataInicio.getTime() / 1000) | 0;
        var secFinal = (dataFim.getTime() / 1000) | 0;

        setLoading(true);
        vendaService.getDatas(secInicial, secFinal).then((res) => {
            setVendas(res);
            
            if(res.length){
                let somas = {};
                let calendario = {};
                res.forEach(compra => {
                    const mes = compra.data.toLocaleString('default', { month: 'long' })
                    if(somas[mes])
                        somas[mes] += compra.valor;
                    else{
                        somas[mes] = compra.valor;
                        calendario[mes] = compra.data.getMonth();
                    }
                });

                let meses = Object.keys(somas);
                meses.sort((a, b) => calendario[a] - calendario[b]);

                setData({
                    labels: meses,
                    datasets:[{data: Object.values(somas)}],
                    legend: ["Mêses com vendas registradas no período selecionado"]
                });
            }else{
                setData(null);
            }
        }) 
        .catch(err => {
            console.log(err);
            Alert.alert("Não foi possível buscar os registros devido a um erro.");
        })
        .finally(() => {
            setLoading(false);
            setRefreshing(false);
        });
    }

    const onChangeDataInicio = (event, selectedDate) => {
        if(event.type != "set") return;
        var data = new Date(dataInicio);
        data.setDate(selectedDate.getDate());
        data.setMonth(selectedDate.getMonth());
        data.setFullYear(selectedDate.getFullYear());
        setDataInicio(data);
    }

    const onChangeHoraInicio = (event, selectedTime) => {
        if(event.type != "set") return;
        var data = new Date(dataInicio);
        data.setHours(selectedTime.getHours());
        data.setMinutes(selectedTime.getMinutes());
        setDataInicio(data);
    }

    const abrirDataInicio = () => {
        modalDataHora("date", onChangeDataInicio, dataInicio, false);
    }

    const abrirHoraInicio = () => {
        modalDataHora("time", onChangeHoraInicio, dataInicio, false);
    }

    //fim
    const onChangeDataFim = (event, selectedDate) => {
        if(event.type != "set") return;
        var data = new Date(dataFim);
        data.setDate(selectedDate.getDate());
        data.setMonth(selectedDate.getMonth());
        data.setFullYear(selectedDate.getFullYear());
        setDataFim(data);
    }

    const onChangeHoraFim = (event, selectedTime) => {
        if(event.type != "set") return;
        var data = new Date(dataFim);
        data.setHours(selectedTime.getHours());
        data.setMinutes(selectedTime.getMinutes());
        setDataFim(data);
    }

    const abrirDataFim = () => {
        modalDataHora("date", onChangeDataFim, dataFim, true);
    }

    const abrirHoraFim = () => {
        modalDataHora("time", onChangeHoraFim, dataFim, true);
    }

    const modalDataHora = (modo, onChange, value, fim) =>{
        DateTimePickerAndroid.open({
            value: value ?? new Date(),
            onChange,
            mode: modo,
            is24Hour: true,
            minimumDate: fim ? dataInicio : null
        });
    }

    const formataDezena = (num) => num.toLocaleString(undefined, {minimumIntegerDigits: 2});

    const adicionarVenda = () => navigation.navigate("AdicionarVenda");

    const abrirModal = (venda) => {
        setSelectedVenda(venda);
        setModalVisivel(true);
    }

    const deletarRegistro = () => {
        setModalVisivel(false);
        vendaService.deleteById(selectedVenda.id).then(res => {
            console.log("Registro deletado com sucesso.");
            ToastAndroid.show("Resgitro deletado com sucesso.", ToastAndroid.SHORT);
            get();
        }).catch(err => {
            console.log(err);
            Alert.alert("Não foi possível deletar o registro devido a um erro.");
        });
    }

    const onRefresh = () => {
        setRefreshing(true);
        get();
    }

    const editarVenda = (id) => navigation.navigate("AdicionarVenda", {id});

    return (
        <View style={s.scrollview}>
            <FlatList 
                data={vendas}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={() => <>
                    <View style={s.cabecalho}>
                        <View style={s.containerTitle}>
                            <Text style={s.title}>Consultar vendas</Text>
                            <MaterialIcons name="add-box" style={s.iconeAdd} onPress={adicionarVenda} />
                        </View>

                        <View style={s.containerDataLabel}>
                            <Text style={s.labelFiltro}>Data inicial:</Text>
                            <View style={s.linhaDataHora}>
                                <View style={s.filtroDatas}>
                                    <MaterialIcons name="date-range" onPress={abrirDataInicio} style={s.iconeCalendario}/>
                                    <TouchableOpacity onPress={abrirDataInicio} style={s.datas}>
                                        <Text style={s.textoDataHora}>{dataInicio.getDate()}/{dataInicio.getMonth() + 1}/{dataInicio.getFullYear() + " "}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={s.filtroDatas}>
                                    <MaterialIcons name="alarm" onPress={abrirHoraInicio} style={s.iconeCalendario}/>
                                    <TouchableOpacity onPress={abrirHoraInicio} style={s.datas}>
                                        <Text style={s.textoDataHora}>{formataDezena(dataInicio.getHours())}:{formataDezena(dataInicio.getMinutes())}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={s.containerDataLabel}>
                            <Text style={s.labelFiltro}>Data final:</Text>
                            <View style={s.linhaDataHora}>
                                <View style={s.filtroDatas}>
                                    <MaterialIcons name="date-range" onPress={abrirDataFim} style={s.iconeCalendario}/>
                                    <TouchableOpacity onPress={abrirDataFim} style={s.datas}>
                                        <Text style={s.textoDataHora}>{dataFim.getDate()}/{dataFim.getMonth() + 1}/{dataFim.getFullYear() + " "}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={s.filtroDatas}>
                                    <MaterialIcons name="alarm" onPress={abrirHoraFim} style={s.iconeCalendario}/>
                                    <TouchableOpacity onPress={abrirHoraFim} style={s.datas}>
                                        <Text style={s.textoDataHora}>{formataDezena(dataFim.getHours())}:{formataDezena(dataFim.getMinutes())}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={s.containerBotaoConsultar}>
                            <TouchableOpacity onPress={() => get()} style={s.botaoConsultar}>
                                <Text style={s.textConsultar}>CONSULTAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {data ? 
                        <View style={{alignItems: 'center', marginVertical: 5}}>
                            <LineChart
                                data={data}
                                yAxisLabel="R$ "
                                width={dimensions.width * 0.95}
                                height={256}
                                verticalLabelRotation={30}
                                style={s.grafico}
                                chartConfig={{
                                    backgroundColor: colors.white,
                                    backgroundGradientFrom: colors.white,
                                    backgroundGradientTo: colors.white,
                                    decimalPlaces: 2,
                                    color: colors.charts.green,
                                    labelColor: colors.charts.black,
                                    propsForDots: {
                                        r: "8",
                                        strokeWidth: "2"
                                    }
                                }}
                                bezier
                            />
                        </View>
                    :null}

                    <Text style={s.labelResultados}>Vendas no período selecionado:</Text>
                
                
                </>}
                renderItem={({item}) => 
                            <TouchableOpacity key={item.id} style={s.itemCompra} onPress={() => editarVenda(item.id)}>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <View>
                                        <Text style={s.valorVenda}>{formataReal(item.valor)}</Text>
                                    </View>
                                    <MaterialIcons name="delete" size={20} color={colors.red} onPress={() => abrirModal(item)}/>
                                </View>
                                <Text>
                                    {item.data.getDate()}/
                                    {item.data.getMonth()+1}/
                                    {item.data.getFullYear() + " "}
                                    {item.data.getHours()}:{formataNumero(item.data.getMinutes())}
                                </Text>
                                {item.produtos.map((produto, index) => 
                                    <View key={produto.id} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text>({produto.quantidade}) {produto.nome}</Text>
                                        <Text>{formataReal(produto.precoFinal)}</Text>
                                    </View>
                                )}
                                {item.desconto? <Text style={s.desconto}>Desconto: {formataReal(item.desconto)}</Text>:null}
                                {item.observacoes? <Text style={s.observacoes}>{item.observacoes}</Text> : null}
                            </TouchableOpacity>
                }
                ListFooterComponent={() => loading ? <ActivityIndicator size={"large"} color={colors.white}/> : null}
                ListEmptyComponent={() => <Text style={s.naoHaResultados}>Não há vendas para o período pesquisado.</Text>}
            />

            <ModalSimples
                modalVisivel={modalVisivel}
                setModalVisivel={setModalVisivel}
                onPressConfirmar={() => deletarRegistro()}
            />
        </View>
    );
}