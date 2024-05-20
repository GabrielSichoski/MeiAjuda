import { useState } from "react";
import { ActivityIndicator, Alert, FlatList, TouchableOpacity, Text, View } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigationState } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import DropDownPicker from "react-native-dropdown-picker";
import s from "./styles";
import {colors, dimensions, formataReal} from "../../variables";
import LucroService from "../../services/lucroService";
import { formataNumero } from "../../variables";

export default function ConsultarLucro({navigation}){
    const [dataInicio, setDataInicio] = useState(new Date());
    const [dataFim, setDataFim] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [selectedTipo, setSelectedTipo] = useState();
    const [data, setData] = useState();
    const [pickerAberto, setPickerAberto] = useState(false);
    const [pesquisaFeita, setPesquisaFeita] = useState(false);
    const [lucros, setLucros] = useState([]);
    const routeIndex = useNavigationState(state => state.index);

    const tipos = {
        total: "Total",
        periodo: "Por período"
    }
    
    const lucroService = LucroService();

    const get = () => {
        switch(selectedTipo){
            case tipos.total:{
                getTotal();
                break;
            }
            case tipos.periodo:{
                getData();
                break;
            }
        }
    }

    const getTotal = () =>{
        setLoading(true);
        lucroService.getTudoPorMes().then(res => {
            setPesquisaFeita(true);
            setLucros(res);
            if(res.length){
                setData({
                    labels: res.map((mes) => mes.mes),
                    datasets:[{
                        data: res.map((mes) => mes.valor),
                    }]
                });
            }else{
                setData(null);
            }
        }).catch(err => {
            Alert.alert("Erro", "Não foi buscar os registros devido a um erro.");
            console.log(err);
        }).finally(() => setLoading(false));
    }

    const getData = () => {
        var secInicial = (dataInicio.getTime() / 1000) | 0;
        var secFinal = (dataFim.getTime() / 1000) | 0;

        lucroService.getDatas(secInicial, secFinal).then((res) => {            
            setPesquisaFeita(true);
            setLucros(res);
            if(res.length){
                setData({
                    labels: res.map((mes) => mes.mes),
                    datasets:[{
                        data: res.map((mes) => mes.valor),
                    }]
                });
            }else{
                setData(null);
            }
        }) 
        .catch(err => {
            console.log(err);
            Alert.alert("Erro", "Não foi possível buscar os registros devido a um erro.");
        })
        .finally(() => setLoading(false));
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

    return (
        <FlatList
            style={s.scrollview}
            contentContainerStyle={lucros.length ? null : {flex:1}}
            data={lucros}
            ListHeaderComponent={<>
                <View style={s.cabecalho}>
                    <View style={s.containerTitle}>
                        {routeIndex ? <Ionicons name="arrow-back" style={s.iconeVoltar} onPress={() => navigation.pop()}/> : null}
                        <Text style={s.title}>Lucros</Text>
                    </View>

                    <DropDownPicker
                        style={s.picker}
                        containerStyle={s.picker}
                        open={pickerAberto}
                        setOpen={setPickerAberto}
                        value={selectedTipo}
                        items={Object.keys(tipos).map((tipo, i) => {
                            const value = tipos[tipo];
                            return {label: value, value}
                        })}
                        setValue={setSelectedTipo}
                        onChangeValue={(valor) => setSelectedTipo(valor)}
                        placeholderStyle={s.placeholder}
                        placeholder="Selecione a periodicidade"
                    />

                    {selectedTipo == tipos.periodo ? <>
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
                                        <Text style={s.textoDataHora}>{formataNumero(dataInicio.getHours())}:{formataNumero(dataInicio.getMinutes())}</Text>
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
                                        <Text style={s.textoDataHora}>{formataNumero(dataFim.getHours())}:{formataNumero(dataFim.getMinutes())}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </>:null}

                    <View style={s.containerBotaoConsultar}>
                        <TouchableOpacity onPress={() => get()} style={s.botaoConsultar} disabled={!selectedTipo}>
                            <Text style={s.textConsultar}>CONSULTAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={s.resultados}>
                {data ? 
                    <View style={[{alignItems: 'center', marginVertical: 5}, s.grafico]}>
                        <Text>Lucro por mês</Text>
                        <LineChart
                            data={data}
                            yAxisLabel="R$ "
                            width={dimensions.width * 0.85}
                            height={dimensions.width * 0.60}
                            verticalLabelRotation={30}
                            withShadow={true}
                            getDotColor={(dataPoint, index) => dataPoint == 0 ? colors.darkGrey 
                                : dataPoint > 0 ? colors.green : colors.red}
                            chartConfig={{
                                backgroundColor: colors.white,
                                backgroundGradientFrom: colors.white,
                                backgroundGradientTo: colors.white,
                                decimalPlaces: 2,
                                strokeWidth: 2,
                                color: colors.charts.black,
                                labelColor: colors.charts.noOpacityBlack,
                                propsForDots: {
                                    r: "7",
                                    strokeWidth: '2'
                                }
                            }}
                            bezier
                            fromZero={true}
                        />
                    </View>
                :null}
  
            </View>
            </>}
            keyExtractor={(item) => item.mes}
            renderItem={({item}) =>
                <View style={s.produto}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={[s.lucro, {
                            color: item.valor == 0 ? colors.black 
                                  : item.valor > 0 ? colors.green
                                                   : colors.red
                            }]}>{formataReal(item.valor)}</Text>
                        <Text style={s.mes}>{item.mes}</Text>
                    </View>
                    <Text style={s.bold}>Compras: <Text style={s.compras}>{formataReal(item.compras)}</Text></Text>
                    <Text style={s.bold}>Vendas: <Text style={s.vendas}>{formataReal(item.vendas)}</Text></Text>
                </View>
            }
            ListEmptyComponent={pesquisaFeita? <Text style={s.naoHaResultados}>Não foram encontrados registros para a pesquisa.</Text> : null}
            ListFooterComponent={loading ? <ActivityIndicator size={"large"} color={colors.white}/> : null}
        />
    );
}