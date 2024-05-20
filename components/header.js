import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigationState } from "@react-navigation/native";
import {colors} from "../variables";

export default function Header({
    title,
    navigation
}){
    const routeIndex = useNavigationState(state => state.index);
    return (
        <View style={s.containerTitle}>
            {routeIndex ? <Ionicons name="arrow-back" style={s.iconeVoltar} onPress={() => navigation.pop()}/> : null}
            <Text style={s.title}>{title}</Text>
        </View>
    )
}

const s = StyleSheet.create({
    containerTitle:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.darkGreen3,
        padding: 10
    },
    iconeVoltar:{
        fontSize: 25,
        color: colors.white,
        marginRight: 15
    },
    title:{
        color: colors.white,
        fontSize: 21
    }
})