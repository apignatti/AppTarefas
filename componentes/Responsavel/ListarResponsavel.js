import { Text, View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from 'react';

function ListarResponsavel({ route }) {
    const itemRota = route.params;
    const [item, setItem] = useState(itemRota.item);

    return (
        <ScrollView contentContainerStyle={estilo.container}>
            <View style={estilo.topo}>
                <Text style={estilo.textoTopo}>Detalhes do Responsável</Text>
            </View>

            <View style={estilo.itemLista}>
                <Text style={estilo.idResponsavel}>ID: #{item.id}</Text>
                
                <Text style={estilo.rotulo}>Nome:</Text>
                <Text style={estilo.valor}>{item.nome}</Text>

                <Text style={estilo.rotulo}>E-mail:</Text>
                <Text style={estilo.valor}>{item.email}</Text>

                <Text style={estilo.rotulo}>Telefone:</Text>
                <Text style={estilo.valor}>{item.telefone || "Não informado"}</Text>

                <Text style={estilo.rotulo}>Cargo:</Text>
                <Text style={estilo.valor}>{item.cargo || "Não informado"}</Text>

                <Text style={estilo.rotulo}>Departamento:</Text>
                <Text style={estilo.valor}>{item.departamento || "Não informado"}</Text>

                <Text style={estilo.rotulo}>Especialidade:</Text>
                <Text style={estilo.valor}>{item.especialidade || "Não informada"}</Text>

                <Text style={estilo.rotulo}>Foto (URL):</Text>
                <Text style={estilo.valor}>{item.foto || "Não informada"}</Text>

                <View style={estilo.containerDatas}>
                    <Text style={estilo.data}>Cadastrado em: {item.createdAt || item.data_criacao || "N/A"}</Text>
                    <Text style={estilo.data}>Atualizado em: {item.updatedAt || item.data_atualizacao || "N/A"}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const estilo = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f2f4f7',
        alignItems: 'center',
        paddingBottom: 20,
    },
    topo: {
        width: '100%',
        height: 80,
        backgroundColor: '#2563eb',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        marginBottom: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
    textoTopo: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    itemLista: {
        backgroundColor: '#ffffff',
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        width: '92%',
        padding: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    idResponsavel: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 10,
        fontWeight: '600',
    },
    rotulo: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#2563eb',
        marginTop: 8,
    },
    valor: {
        fontSize: 16,
        color: '#222222',
        marginBottom: 4,
    },
    containerDatas: {
        marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#eeeeee',
        paddingTop: 10,
    },
    data: {
        fontSize: 12,
        color: '#777777',
        marginBottom: 3,
    },
});

export default ListarResponsavel;