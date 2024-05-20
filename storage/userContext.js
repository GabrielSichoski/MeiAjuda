import { createContext, useContext, useEffect, useState } from "react";
import { AsyncStorageService, CHAVE_GENERO, CHAVE_NOME_FANTASIA, CHAVE_SAUDACAO, CHAVE_SEM_SAUDACAO } from "./asyncStorageService";

const UserContext = createContext({
    nome: '',
    setNome: () => {},
    genero: 0,
    setGenero: () => {},
    saudacao: '',
    setSaudacao: () => {},
    semSaudacao: false,
    setSemSaudacao:  () => {},
    setInformacoesPessoais: () => {},
    loadingAuth: true
});

export const UserProvider = ({children}) => {
    const [nome, setNome] = useState(null);
    const [genero, setGenero] = useState(null);
    const [saudacao, setSaudacao] = useState(null);
    const [semSaudacao, setSemSaudacao] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const storageService = AsyncStorageService();
    
    useEffect(() => {
        const verificaUsuarioLogado = async () => {
            const nome = await storageService.get(CHAVE_NOME_FANTASIA);
            const genero = Number(await storageService.get(CHAVE_GENERO));
            const semSaudacao = (await storageService.get(CHAVE_SEM_SAUDACAO)) == "true";
            if(!semSaudacao){
                const saudacao = await storageService.get(CHAVE_SAUDACAO);
                setSaudacao(saudacao);
            }
            setGenero(genero);
            setSemSaudacao(semSaudacao);
            setNome(nome);
            setLoadingAuth(false);
        }

        verificaUsuarioLogado();
    })

    const setInformacoesPessoais = (nome, genero, semSaudacao, saudacao) => {
        setNome(nome);
        setGenero(genero);
        setSemSaudacao(semSaudacao);
        if(!semSaudacao)
            setSaudacao(saudacao);
    }

    return (
        <UserContext.Provider value={{
            nome,
            setNome,
            genero,
            setGenero,
            saudacao,
            setSaudacao,
            semSaudacao,
            setSemSaudacao,
            setInformacoesPessoais,
            loadingAuth
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    return context;
}