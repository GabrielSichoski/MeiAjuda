import { View, StyleSheet, Modal, TouchableOpacity, Pressable, Text } from "react-native";
import {colors} from "../variables";

export default function ModalSimples({
  modalVisivel = false,
  setModalVisivel,
  heading = "Tem certeza que deseja apagar o registro permanentemente?", 
  subHeading = "Esta ação não poderá ser desfeita.",
  onPressConfirmar
  }){

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisivel}
            onRequestClose={() => {setModalVisivel(false)}}
        >
            <Pressable onPress={() => setModalVisivel(false)} style={s.centeredView}>
                <Pressable onPress={() => {}} style={s.modalView}>
                    <Text style={s.headingModal}>{heading}</Text>
                    <Text>{subHeading}</Text>

                    <View style={s.botoesModal}>
                        <TouchableOpacity onPress={() => setModalVisivel(false)}>
                            <Text style={s.textCancelarModal}>NÃO, CANCELAR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={s.botaoDeletarModal}
                            onPress={onPressConfirmar}
                            >
                            <Text style={s.textBotaoModal}>SIM, DELETAR</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    )
}

const s = StyleSheet.create({
    centeredView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black7
    },
    modalView: {
        width: '90%',
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    headingModal:{
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center'
    },
    botoesModal:{
        marginTop: 15,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%'
    },
    botaoDeletarModal:{
        backgroundColor: colors.red,
        padding: 5,
        paddingHorizontal: 7,
        borderRadius: 5
    },
    textBotaoModal:{
        color: colors.white
    },
    textCancelarModal:{
        color: colors.darkGreen1
    }
})