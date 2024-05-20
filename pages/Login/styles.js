import { StyleSheet } from "react-native";
import {colors, dimensions} from "../../variables";

const styles = StyleSheet.create({
    container:{ 
        flex: 1,
        justifyContent: 'center', 
        backgroundColor: colors.darkGreen3,
        paddingHorizontal: 20
    },
    containerImagem:{ 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: 20 
    },
    imgLogo:{ 
        width: dimensions.width * 0.7,
        height: dimensions.width * 0.7, 
        resizeMode: 'contain'
    },
    txtBemVindo:{
        color: colors.white,
        fontSize: 24
    },
    label:{
        fontSize: 15,
        color: colors.white,
        textAlign: 'left',
        zIndex: 0
    },
    txtInput:{ 
        backgroundColor: colors.white, 
        color: colors.black, 
        marginBottom: 20, 
        paddingHorizontal: 10, 
        borderRadius: 15,
        height: 45,
    },
    picker:{
        borderRadius: 15,
        zIndex: 99,
        marginBottom: 10
    },
    placeholder:{
        color: colors.grey,
        zIndex: 99
    },
    boasVindas:{
        borderWidth: 2, 
        borderColor: colors.white,
        borderRadius: 15,
        height: 40,
        textAlignVertical: 'center',
        paddingLeft: 10,
        color: colors.white,
        fontSize: 15,
        marginHorizontal: 0,
        marginTop: 1
    },
    containerBotao:{
        alignItems: 'center',
        marginTop: 20,
        zIndex: 0
    },
    botao: { 
        backgroundColor: colors.green,
        width: dimensions.width * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 15,
    },
    botaoDisabled:{
        backgroundColor: colors.grey,
        zIndex: 0
    },
    txtBotao:{
        fontSize: 18,
        color: colors.white
    }
});

export default styles;