import { StyleSheet } from "react-native";
import {colors, dimensions} from "../../variables";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.darkGreen3,
      padding: '2.5%'
    },
    headerBemVindo:{
        display: "flex", 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginVertical: 15,
    },
    textoBemVindo:{
        color: colors.white,
        fontSize: 27,
        flexWrap: 'wrap',
        flex: 1
    },
    textoVendaRapida:{
        color: colors.white,
        fontSize: 20
    },
    containerLucro:{
        backgroundColor: colors.white,
        borderRadius: 15,
        padding: 10
    },
    tituloLucro:{
        fontSize: 18
    },
    valorLucro:{
        fontSize: 25
    },
    itemProduto:{  
        backgroundColor: colors.white,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingTop: 5,
        width: dimensions.width * 0.9, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginRight: 7,
        marginVertical: 5
    },
    nomeProd:{
        fontFamily: 'geo-bold',
        fontSize: 20
    },
    quantidade:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    maisMenos:{
        fontWeight: 'bold',
        fontSize: 25,
        padding: 5,
        paddingHorizontal: 17,
        marginHorizontal: 5,
        backgroundColor: colors.lightGrey,
        borderRadius: 100
    },
    containerValorSalvar:{
        flexDirection: 'row',
        height: 35
    },
    containerCampoValor:{
        backgroundColor: colors.white,
        borderRadius: 15,
        flex:2,
        paddingLeft: 15,
        marginRight: 5,
        justifyContent: 'center'
    },
    campoValor:{
        lineHeight: 30
    },
    botaoSalvar:{
        backgroundColor: colors.green,
        borderRadius: 15,
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtBotaoSalvar:{
        color: colors.white,
        fontSize: 17
    },
    containerSemProduto:{
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.width *0.95,
        backgroundColor: colors.white,
        backgroundColor: colors.white,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5
    },
    txtSemProdutos:{
        textAlign: 'center',
        fontSize: 15
    },
    iconeSemProdutos:{
        fontSize: 50,
        textAlign: 'center',
        padding: 5
    },
    linhaBotao:{
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 5
    },
    botao:{
        backgroundColor: colors.white,
        borderRadius: 15,
        flex: 1,
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
        height: 60
    },
    iconeBotao:{
        marginRight: 10,
        color: colors.white,
        fontSize: 35
    },
    botaoProdutos:{
        backgroundColor: colors.yellow,
    },
    botaoVendas:{
        backgroundColor: colors.green,
    },
    botaoCompras:{
        backgroundColor: colors.red,
    },
    botaoLucros:{
        backgroundColor: colors.blue,
    },
    txtBotao:{
        color: colors.white,
        fontSize: 18,
        marginLeft: 10,
        fontFamily: "geo-light"
    },
    bold:{
        fontFamily: 'geo-bold'
    }
});

export default styles;