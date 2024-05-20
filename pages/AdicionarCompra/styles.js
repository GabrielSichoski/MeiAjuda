import { StyleSheet } from "react-native";
import {colors} from "../../variables";

const styles = StyleSheet.create({
    tudo:{
        backgroundColor: colors.darkGreen3,
        flex: 1,
        paddingHorizontal: 20
    },
    containers:{
        marginVertical: 5
    },
    nomeInput:{
        color: colors.white,
        fontSize: 20,
        marginBottom: 5
    },
    containerInputValor:{
        backgroundColor: colors.white,
        height: 50,
        borderRadius: 15,
        paddingHorizontal: 10,
    },
    inputValor:{
        fontSize: 20
    },
    containerDataHora:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    containerData:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputDataHora:{
        backgroundColor: colors.white,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 7,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    iconesDataHora:{
        color: colors.white,
        fontSize: 25
    },
    data:{
        color: colors.black,
        fontSize: 20
    },
    inputObservacoes:{
        backgroundColor: colors.white,
        color: colors.black,
        borderRadius: 10,
        paddingHorizontal:10,
        paddingVertical: 5,
        textAlignVertical: "top"
    },
    botoesContainer:{
        flexDirection: 'row'
    },
    botoes:{
        marginVertical: 20,
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    botaoSalvar:{
        backgroundColor: colors.green,
    },
    botaoExcluir:{
        backgroundColor: colors.red,
        marginRight: 15
    },
    iconeBotao:{
        fontSize: 24,
        color: colors.white,
        marginRight: 10
    },
    textBotao:{
        fontSize: 20,
        color: colors.white
    }
})

export default styles;