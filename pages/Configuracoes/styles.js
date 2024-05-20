import { StyleSheet } from "react-native";
import {colors} from "../../variables";

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', 
    backgroundColor: colors.darkGreen3,
    flexDirection: 'column', 
    padding: 20, 
  },
  containerImagem: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 20
  },
  imgLogo: { 
    width: 140, 
    height: 140, 
    resizeMode: 'contain',
    marginBottom: 20
  },
  label:{
    color: colors.white
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
  txtInput: { 
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 15,
    textAlignVertical: 'center',
  },
  txtInputDisabled:{
    backgroundColor: colors.darkGreen3,
    borderWidth: 2,
    borderColor: colors.white
  },
  boasVindas:{
    borderWidth: 2, 
    borderColor: colors.white,
    borderRadius: 15,
    textAlignVertical: 'center',
    paddingLeft: 10,
    color: colors.white,
    fontSize: 15,
    marginHorizontal: 0,
    marginTop: 1,
    marginBottom: 15
},
  txtInputAviso:{
    borderColor: colors.red,
    borderWidth: 2,
    marginBottom: 0,
  },
  aviso: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 15,
    justifyContent: 'space-between',
    height: 250,
    borderColor: colors.red,
    borderWidth: 1
  },
  txtAviso:{
    textAlign: 'center',
    color: colors.red, 
    fontSize: 16, 
    color: colors.red
  },
  botao: {
    backgroundColor: colors.green, 
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  botaoAlerta:{
    width: 350,
    marginBottom: 0,
    backgroundColor: colors.red
  },
  botaoTexto: {
    color: colors.white,
    fontSize: 17
  },
});

export default styles;