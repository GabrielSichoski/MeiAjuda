import { Dimensions } from "react-native";

const colors = {
    white: '#fff',
    green: '#3c9c03',
    darkGreen1: "#0d6924",
    darkGreen2: "#0E4D1e",
    darkGreen3: "#0e201e",
    yellow: '#ffa700',
    yellowLogo: '#fcd770',
    blue: "#0047AB",
    red: '#f00',
    darkRed: 'rgb(195,0,0)',
    lighterGrey: '#efefef',
    lightGrey: '#dfdfdf',
    grey: '#cfcfcf',
    darkGrey: '#555',
    black: "#000",

    charts: {
        noOpacityBlack: (opacity = 1) => `rgba(0, 0, 0, 1)`,
        black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        green: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
        red: (opacity = 1) => `rgba(128, 0, 0, ${opacity})`,
        darkGreen: "#006400"
    },

    pieChart:[
        "#187B00",
        "#0e4900",
        "#8fce00",
        "#0f0",
        "#28ce00",
    ],

    black7: "rgba(0,0,0,0.7)",
    red5: 'rgba(255,0,0,0.5)'
}

const saudacoes = {1: 'Bem vindo, ', 2: 'Bem vinda, '};

const formataReal = (num) => new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(num);
const formataNumero = (num = 0) => num.toString().padStart(2, '0');

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

export {colors, formataReal, formataNumero, dimensions, saudacoes};