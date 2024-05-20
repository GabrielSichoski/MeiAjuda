import { StyleSheet } from "react-native";
import {colors, dimensions} from "../../variables";

const styles = StyleSheet.create({
    scrollview:{
        backgroundColor: colors.darkGreen3,
        flex:1,
        paddingHorizontal: 10
    },
    cabecalho:{
        justifyContent:"space-around"
    },
    containerTitle:{
        justifyContent: 'space-between',
        flexDirection: 'row',
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
    iconeAdd:{
        color: colors.white,
        fontSize: 24,
        marginRight: 10
    },
    textInputContainer:{
        backgroundColor: colors.white,
        flexDirection: 'row',
        borderColor: colors.grey,
        borderWidth: 1.5,
        height: 50,
        alignItems: 'center',
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    iconLupa:{
        fontSize: 24,
        color: colors.black,
        paddingRight: 5
    },
    textInput:{
        width: "100%",
    },
    containerGrafico:{
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 15,
        paddingTop: 5,
        marginBottom: 5
    },
    tituloGrafico:{
        fontSize: 15,
        fontFamily: 'geo-bold',
        color: colors.pieChart[1]
    },
    produto:{
        backgroundColor: colors.white,
        justifyContent: 'center',
        marginVertical: 5,
        borderRadius: 15,
        padding: 10
    },
    nomeProduto:{
        fontSize: 19,
        fontFamily: 'geo-bold',
        flexWrap: 'wrap',
        flex: 1
    },
    precoProduto:{
        fontFamily: 'geo-bold',
        fontSize: 19
    },
    descricaoProduto:{
        color: colors.darkGrey
    },
    containerSemProduto:{
        marginTop: dimensions.height * 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtSemProdutos:{
        color: colors.white,
        textAlign: 'center',
        fontSize: 17
    },
    iconeSemProdutos:{
        fontSize: 60,
        textAlign: 'center',
        padding: 10
    }
});

export default styles;