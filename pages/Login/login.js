import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, Keyboard, Alert } from 'react-native';
import { AsyncStorageService } from '../../storage/asyncStorageService';
import { useUser } from '../../storage/userContext';
import s from "./styles";
import { colors, saudacoes } from '../../variables';
import DropDownPicker from 'react-native-dropdown-picker';
import Checkbox from 'expo-checkbox';

const Login = () => {
  const [nome, setNome] = useState('');
  const [pickerAberto, setPickerAberto] = useState(false);
  const [genero, setGenero] = useState(null);
  const [saudacao, setSaudacao] = useState(null);
  const [semSaudacao, setSemSaudacao] = useState(false);
  const [generos, setGeneros] = useState([
    {label: 'Masculino', value: 1}, 
    {label: 'Feminino', value: 2},
    {label: 'Outro', value: 3}]
  );
  const userContext = useUser();
  const storageService = AsyncStorageService();

  useEffect(() => {
    Keyboard.dismiss();
  }, [pickerAberto])

  const salvar = () => {
    if(!nome && !genero){
      Alert.alert("Erro", "Os campos Nome fantasia e Gênero são obrigatórios!");
      return;
    }else if(!nome){
      Alert.alert("Erro", "O campo Nome fantasia é obrigatório!");
      return;
    }else if(!genero){
      Alert.alert("Erro", "O campo Gênero é obrigatório!");
      return;
    }

    storageService.salvarDadosPessoais(nome, genero, semSaudacao, saudacao).then(() => {
      userContext.setInformacoesPessoais(nome,genero,semSaudacao,saudacao);
    }).catch(err => console.log(err));
  };

  const verificaCampos = () => 
    ((saudacao != null && saudacao != '') || semSaudacao) &&
    nome;

  return (
    <View style={s.container}>
        <View style={s.containerImagem}>
          <Image source={require('../../assets/logomeiajuda.png')} style={s.imgLogo} />
        </View>

        <Text style={s.label}>Nome fantasia</Text>
        <TextInput
          placeholder="Insira o nome fantasia..."
          placeholderTextColor={colors.grey}
          style={s.txtInput}
          onChangeText={setNome}
          value={nome}
        />
        
        <Text style={s.label}>Gênero</Text>
        <View style={s.picker}>
          <DropDownPicker
            style={s.picker}
            open={pickerAberto}
            setOpen={setPickerAberto}
            value={genero}
            items={generos}
            setValue={setGenero}
            onChangeValue={(valor) => {
              setGenero(valor);
              if(!semSaudacao){
                if(valor <= 2)
                setSaudacao(saudacoes[valor]);
                else
                setSaudacao("");
              }
            }}
            setItems={setGeneros}
            placeholder='Escolha o gênero...'
            placeholderStyle={s.placeholder}
          />
        </View>
       
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Checkbox 
            style={{marginRight: 10}}
            value={semSaudacao}
            onValueChange={(value) => {
              setSemSaudacao(value);
              if(genero <= 2) setSaudacao(saudacoes[genero]);
              if(value) setSaudacao('');
            }}
          />
          <Text style={s.label}>Sem saudação</Text>
        </View>

        {!semSaudacao && genero == 3 && nome ?
        <View>
          <Text style={s.label}>Mensagem de boas vindas</Text>
          <TextInput
            placeholder='Olá, milorde...'
            placeholderTextColor={colors.darkGrey}
            style={s.txtInput}
            onChangeText={setSaudacao}
            value={saudacao ?? "Olá, milorde "}
          />
        </View>:null}

        {genero != null && nome ?
        <View>
          <Text style={s.label}>O título que será mostrada no menu inicial será:</Text>
          <Text style={s.boasVindas}>{saudacao ?? ''}{nome}</Text>
        </View>:null}

        <View style={s.containerBotao}>
          <TouchableOpacity 
            onPress={() => salvar()} 
            style={[s.botao, !verificaCampos() ? s.botaoDisabled : null]} 
            disabled={!verificaCampos()}>
            <Text style={s.txtBotao}>PRÓXIMO</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default Login;