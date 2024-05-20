import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const CHAVE_NOME_FANTASIA = 'nomeFantasia';
export const CHAVE_GENERO = 'genero';
export const CHAVE_SAUDACAO = 'saudacao';
export const CHAVE_SEM_SAUDACAO = 'semSaudacao';

export function AsyncStorageService(){
    const save = async (key, value) => {
        return await AsyncStorage.setItem(key, value);
    }

    const salvarDadosPessoais = async (nome, genero, semSaudacao, saudacao = null) =>{
        return await salvarNomeFantasia(nome).then(async () =>
            await salvarGenero(genero)).then(async () =>
                await salvarSemSaudacao(semSaudacao).then(async () =>{
                    if(!semSaudacao){
                        await salvarSaudacao(saudacao)
                        .catch(tratarErroSalvarDadosPessoais)
                    }}
                ).catch(tratarErroSalvarDadosPessoais)
            ).catch(tratarErroSalvarDadosPessoais);
    }

    const tratarErroSalvarDadosPessoais = (err) => {
        console.log(err.message);
        Alert.alert("Erro", "Não foi possível salvar os dados pessoais devido a um erro.");
    }

    const salvarGenero = async (genero) => {
        return await AsyncStorage.setItem(CHAVE_GENERO, genero.toString());
    }

    const salvarSaudacao = async (saudacao) => {
        return await AsyncStorage.setItem(CHAVE_SAUDACAO, saudacao);
    }

    const salvarSemSaudacao = async (semSaudacao) => {
        return await AsyncStorage.setItem(CHAVE_SEM_SAUDACAO, JSON.stringify(semSaudacao));
    }

    const salvarNomeFantasia = async (nome) => {
        return await AsyncStorage.setItem(CHAVE_NOME_FANTASIA, nome);
    }

    const get = async (key) => {
        return await AsyncStorage.getItem(key);
    }

    const getNomeFantasia = async () => {
        return await AsyncStorage.getItem(CHAVE_NOME_FANTASIA);
    }

    const remove = async (key) => {
        return await AsyncStorage.removeItem(key);
    }

    const removeDadosPessoais = () => {
        const chaves = [CHAVE_GENERO, CHAVE_NOME_FANTASIA, CHAVE_SAUDACAO, CHAVE_SEM_SAUDACAO];
        return chaves.forEach(async chave => await remove(chave));
    }

    return {
        save, 
        get, 
        remove, 
        salvarDadosPessoais,
        salvarNomeFantasia, 
        getNomeFantasia,
        removeDadosPessoais
    };
}