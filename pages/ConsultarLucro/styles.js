import { StyleSheet } from "react-native";
import {colors} from "../../variables";

const styles = StyleSheet.create({
    scrollview:{
        backgroundColor: colors.darkGreen3,
        paddingHorizontal: 10
    },
    cabecalho:{
        justifyContent:"space-around",
        zIndex: 99
    },
    containerTitle:{
        flexDirection: 'row',
        marginHorizontal: 5,
        marginVertical: 10,
        alignItems: 'center'
    },
    iconeVoltar:{
        fontSize: 25,
        color: colors.white,
        marginRight: 15
    },
    title: {
        color: colors.white,
        fontSize: 25, 
        textAlign: 'center'
    },
    containerDataLabel:{
        marginHorizontal: 5
    },
    picker:{
        borderRadius: 15,
        zIndex: 99
    },
    labelFiltro:{
        fontSize: 15,
        color: colors.white  
    },
    linhaDataHora:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2
    },
    filtroDatas: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flex:1
    },
    iconeCalendario:{
        fontSize: 24,
        color: colors.white
    },
    datas:{
        backgroundColor: colors.white, 
        marginVertical: 5,
        marginHorizontal: 5,
        height: 35, 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingHorizontal: 20,
        flex: 1
    },
    textoDataHora:{
        fontSize: 17
    },
    grafico:{
        borderRadius: 15,
        backgroundColor: colors.white,
        padding: 15,
        paddingTop: 20
    },
    labelResultados:{
        color: colors.white,
        fontSize: 15,
        marginHorizontal: 10
    },
    itemCompra:{
        backgroundColor: colors.white,
        margin: 10,
        borderRadius: 15,
        padding: 10
    },
    containerBotaoConsultar: {
        alignItems: "center"
    },
    botaoConsultar: {
        alignItems: "center",
        backgroundColor: colors.yellow,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        marginVertical: 10
    },
    textConsultar:{
        color: colors.white,
        fontSize: 17
    },
    resultados: {
        flex: 1
    },
    naoHaResultados: {
        color: colors.white,
        textAlign:'center'
    },
    produto:{
        backgroundColor: colors.white,
        justifyContent: 'center',
        marginVertical: 5,
        borderRadius: 15,
        padding: 10
    },
    mes:{
        fontSize: 19,
        fontFamily: 'geo-bold'
    },
    lucro:{
        fontFamily: 'geo-bold',
        fontSize: 19
    },
    bold:{
        fontFamily: 'geo-bold'
    },
    compras:{
        color: colors.red
    },
    vendas: {
        color: colors.green
    }
});

export default styles;