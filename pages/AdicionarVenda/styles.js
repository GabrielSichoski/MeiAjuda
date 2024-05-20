import { StyleSheet } from "react-native";
import {colors} from "../../variables";

const styles = StyleSheet.create({
    tudo:{
        backgroundColor: colors.darkGreen3,
        flex: 1,
        paddingHorizontal: 10
    },
    titleCollapse:{
        fontSize: 30,
        color: colors.white
    },
    containerProdutos:{
        margin: 5
    },
    itemProduto:{
        padding: 7,
        marginVertical: 5,
        borderRadius: 15,
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nomeProduto:{
        fontWeight: 'bold',
        fontSize: 18,
        flexWrap: 'wrap',
        flex: 1
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
    containerBotaoAdd:{
        alignItems: 'baseline'
    },
    botaoAddProduto:{
        backgroundColor: colors.green,
        flexDirection: 'row',
        borderRadius: 15,
        padding: 7,
        alignItems: 'center'
    },
    iconeAdd:{
        fontSize: 20,
        color: colors.white
    },
    textBotaoAdd:{
        color: colors.white,
        marginLeft: 5
    },
    labels:{
        color: colors.white,
        fontSize: 20,
    },
    inputNome:{
        backgroundColor: colors.white,
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 10
    },
    containerInputValor:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        flex:1
    },
    labelValor:{
        fontFamily: 'geo-bold',
        marginRight: 5
    },
    labelDesconto:{
        fontSize: 15,
        marginRight: 5
    },
    inputValor:{
        height: 35,
        paddingHorizontal: 10,
        backgroundColor: colors.white,
        borderRadius: 15,
        lineHeight: 30,
        flex:1
    },
    dica:{
        fontSize: 11,
        color: colors.white,
        marginBottom: 10,
        textAlign: "right"
    },
    inputObservacoes:{
        backgroundColor: colors.white,
        borderRadius: 15,
        textAlignVertical: 'top',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    containerDataHora:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    itemDataHora:{
        alignItems: 'center',
        flexDirection: 'row',
        flex:1
    },
    icones:{
        fontSize: 25
    },
    inputDataHora:{
        backgroundColor: colors.white,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 7,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    },
    data:{
        fontSize: 17
    },
    containers:{
        marginVertical: 10
    },
    botoesContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    botoes:{
        flex:1,
        margin: 20,
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row"
    },
    botaoSalvar:{
        backgroundColor: colors.green
    },
    botaoExcluir:{
        backgroundColor: colors.red
    },
    textBotao:{
        fontSize: 20,
        color: colors.white,
        marginLeft: 15
    }
});

export default styles;