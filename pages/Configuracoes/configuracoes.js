import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Checkbox from 'expo-checkbox';
import { AsyncStorageService } from '../../storage/asyncStorageService';
import { useUser } from '../../storage/userContext';
import s from './styles';
import TudoService from '../../services/tudoService';
import { colors, saudacoes } from '../../variables';

const Configuracoes = ({navigation}) => {
  const user = useUser();  
  const [nome, setNome] = useState(user.nome);
  const [pickerAberto, setPickerAberto] = useState(false);
  const [genero, setGenero] = useState(user.genero);
  const [saudacao, setSaudacao] = useState(user.saudacao);
  const [semSaudacao, setSemSaudacao] = useState(user.semSaudacao);
  const [textoConfirmacao, setTextoConfirmacao] = useState('');
  const [generos, setGeneros] = useState([
    {label: 'Masculino', value: 1}, 
    {label: 'Feminino', value: 2},
    {label: 'Outro', value: 3}]
  );
  const storageService = AsyncStorageService();
  const tudoService = TudoService();

  const salvar = () => {
    if(!nome){
      Alert.alert("Erro", "É obrigatório ter algum Nome Fantasia.");
      return;
    }

    storageService.salvarDadosPessoais(nome,genero, semSaudacao, saudacao).then(() => {
      user.setInformacoesPessoais(nome, genero, semSaudacao, saudacao);
      navigation.navigate("Home");
    }).catch(err => console.log(err));
  };

  const removerDados = () => {
    if (textoConfirmacao === 'remover') {
      tudoService.apagarDados().then(() => {
        setNome(null);
        storageService.removeDadosPessoais();
        user.setInformacoesPessoais(null, null, null, null)
      }).catch(err => console.log(err));
    } else {
      alert('Digite "remover" para confirmar a exclusão dos dados');
    }
  };

  return (
    <ScrollView contentContainerStyle={s.container} nestedScrollEnabled={true}>
        <View style={s.containerImagem}>
          <Image source={require('../../assets/logomeiajuda.png')} style={s.imgLogo} />
        </View>

        <Text style={s.label}>Nome fantasia</Text>
        <TextInput
          placeholder="Insira seu nome aqui..."
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
              if(valor <= 2)
                setSaudacao(saudacoes[valor]);
              else
                setSaudacao("");
            }}
            setItems={setGeneros}
            placeholderStyle={s.placeholder}
            listMode='SCROLLVIEW'
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

        <View>
          <Text style={s.label}>Mensagem de boas vindas</Text>
          <TextInput
            placeholder={semSaudacao? "" : 'Olá, milorde...'}
            placeholderTextColor={colors.darkGrey}
            style={[s.txtInput, semSaudacao ? s.txtInputDisabled : null]}
            onChangeText={setSaudacao}
            value={saudacao}
            editable={!semSaudacao}
          />
        </View>

        <View>
          <Text style={s.label}>O título que será mostrada no menu inicial será:</Text>
          <Text style={s.boasVindas}>{saudacao?? ''}{nome}</Text>
        </View>

        <TouchableOpacity style={s.botao} onPress={salvar}>
          <Text style={s.botaoTexto}>SALVAR</Text>
        </TouchableOpacity>

        <View style={s.aviso}>
          <TextInput
            placeholder="Digite 'remover' para confirmar..."
            placeholderTextColor={colors.grey}
            style={[s.txtInput, s.txtInputAviso]} 
            onChangeText={setTextoConfirmacao}
            value={textoConfirmacao}
            />
          
          <Text style={s.txtAviso}>
          <FontAwesome name="warning" size={30} color={colors.red} />
          {"\n"}ATENÇÃO: Ao remover os dados, todas as informações armazenadas serão apagadas e não poderão ser recuperadas.
          </Text>
          
          <TouchableOpacity style={[s.botao, s.botaoAlerta]} onPress={removerDados}>
            <Text style={s.botaoTexto}>Remover dados</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

export default Configuracoes;