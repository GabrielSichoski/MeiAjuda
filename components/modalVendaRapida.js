import { useEffect, useState } from "react";
import { View, StyleSheet, Modal, TouchableOpacity, Text, FlatList, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import {colors, formataNumero, formataReal} from "../variables";

export default function ModalVendaRapida({
  modalVisivel = false,
  setModalVisivel,
  onPressConfirmar,
  produtos,
  valor,
  desconto,
  maisUm,
  menosUm,
  }){

    const [data, setData] = useState(new Date());

    useEffect(()=>{
        setData(new Date());
    },[modalVisivel])

    return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {setModalVisivel(false)}}
    >
        <Pressable onPress={() => setModalVisivel(false)} style={s.centeredView}>
            <Pressable onPress={() => {}} style={s.modalView}>
                <Text style={s.headingModal}>Venda rápida</Text>

                <Text style={s.labelProdutos}>Produtos</Text>
                <View style={s.containerProdutos}>
                    <FlatList 
                        data={produtos}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => 
                            <View style={s.itemProduto}>
                                <View>
                                    <Text style={s.nomeProduto}>{item.nome}</Text>
                                    <Text>Valor (un): {formataReal(item.precoProduto)}</Text>
                                    <Text>Total: {formataReal(item.precoFinal)}</Text>
                                </View>
                                <View style={s.quantidade}>
                                    <Text onPress={() => menosUm(item.id)} style={s.maisMenos}>-</Text>

                                    <Text>{item.quantidade}</Text>
                                
                                    <Text onPress={() => maisUm(item.id)} style={s.maisMenos}>+</Text>
                                </View>
                            </View>
                        }
                    />
                </View>

                <View style={s.containerDataHora}>
                    <View style={s.itemDataHora}>
                        <MaterialIcons name="date-range" style={[s.labels, s.icones]} />
                        <View style={s.inputDataHora}>
                                <Text style={s.data}>{data.getDate()}/{data.getMonth() + 1}/{data.getFullYear()}</Text>
                        </View>
                    </View>
            
                    <View style={s.itemDataHora}>
                        <MaterialIcons name="alarm" style={[s.labels, s.icones]}/>
                        <View style={s.inputDataHora}>
                                <Text style={s.data}>{formataNumero(data.getHours())}:{formataNumero(data.getMinutes())}</Text>
                        </View>
                    </View>
                </View>

                <View style={s.containers}>
                    <View style={s.containerFilho}>
                        <Text style={s.labels}>Desconto/acréscimo</Text>
                        <View style={s.input}>
                            <Text style={s.inputTxt}>{formataReal(desconto)}</Text>
                        </View>
                    </View>

                    <View style={s.containerFilho}>
                        <Text style={s.labels}>Valor final</Text>
                        <View style={s.input}>
                            <Text style={s.inputTxt}>{formataReal(valor)}</Text>
                        </View>
                    </View>
                </View>
            
                <View style={s.botoesModal}>
                    <TouchableOpacity onPress={() => setModalVisivel(false)}>
                        <Text style={s.textCancelarModal}>CANCELAR VENDA</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={s.botaoFinalizarVenda}
                        onPress={() => onPressConfirmar(data, valor, desconto, produtos)}
                    >
                        <Text style={s.textBotaoModal}>FINALIZAR VENDA</Text>
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
        backgroundColor: colors.black7,
    },
    modalView: {
        width: '90%',
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
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
    labelProdutos:{
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'flex-start'
    },
    containerProdutos:{
        width: '100%',
        marginBottom: 5
    },
    labels:{
        fontSize: 15,
        fontWeight: 'bold'
    },
    itemProduto:{
        padding: 7,
        marginVertical: 5,
        borderRadius: 15,
        borderColor: colors.grey,
        borderWidth: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    nomeProduto:{
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.black
    },
    quantidade:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    maisMenos:{
        fontWeight: 'bold',
        fontSize: 25,
        padding: 5,
        paddingHorizontal: 16,
        marginHorizontal: 5,
        backgroundColor: colors.lightGrey,
        borderRadius: 100
    },
    containers:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerFilho:{
        flex:1,
        marginHorizontal:5
    },
    containerDataHora:{
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        borderColor: colors.grey,
        borderWidth: 3,
        borderRadius: 15,
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
    input:{
        borderColor: colors.grey,
        borderWidth: 3,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 7,
        justifyContent: 'center',
    },
    inputTxt:{
        fontSize: 16
    },
    botoesModal:{
        marginTop: 15,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    textCancelarModal:{
        color: colors.darkGrey,
        fontSize: 14
    },
    botaoFinalizarVenda:{
        backgroundColor: colors.green,
        padding: 5,
        paddingHorizontal: 7,
        borderRadius: 5
    },
    textBotaoModal:{
        color: colors.white
    },
});