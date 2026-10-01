import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import api from '../../service/api';

const PRIORIDADES = ["BAIXA", "MEDIA", "ALTA"];

export default function EditarTarefa({ route, navigation }) {
    const id = route.params.item.id;

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [preco, setPreco] = useState("");
    const [tempo, setTempo] = useState("");
    const [prioridade, setPrioridade] = useState("MEDIA");
    const [tags, setTags] = useState("");

    const buscarTarefa = async () => {
        try {
            const resposta = await api.get(`/tarefa/${id}`);
            const respTarefa = resposta.data.tarefa;
            setTitulo(respTarefa.titulo ?? "");
            setDescricao(respTarefa.descricao ?? "");
            setResponsavel(respTarefa.responsavel?.nome ?? "");
            setPreco(String(respTarefa.preco ?? ""));
            setTempo(String(respTarefa.tempo_estimado_horas ?? ""));
            setPrioridade(respTarefa.prioridade ?? "MEDIA");
            setTags(respTarefa.tags ?? "");
        } catch (error) {
            console.log("Erro ao buscar serviço: " + error.response?.data?.erro)
        }
    }

    useEffect(() => {
        buscarTarefa();
    }, [])

    const atualizar = async () => {
        if (!titulo.trim() || !descricao.trim() || !responsavel.trim() || !preco.trim() || !tempo.trim()) {
            Alert.alert("Atenção", "Os campos são obrigatórios!");
            return;
        }

        const precoNum = Number(preco.replace(",", "."));
        const tempoNum = Number(tempo.replace(",", "."));

        if (isNaN(precoNum) || isNaN(tempoNum)) {
            Alert.alert("Atenção", "Preço e tempo estimado precisam ser números!");
            return;
        }

        try {
            await api.put(`/tarefa/${id}`, {
                titulo,
                descricao,
                responsavel,
                preco: precoNum,
                tempo_estimado_horas: tempoNum,
                prioridade,
                tags,
            });
            console.log("Sucesso");
            Alert.alert("Sucesso", "Tarefa Atualizada com sucesso!", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            Alert.alert("Erro", "Erro ao atualizar a tarefa!!!");
            console.log("Erro ao atualizar a tarefa!!!", error.response?.data?.mensagem);
        }
    }

    return (
        <View style={estilo.container}>
            <View style={estilo.todo}>
                <View style={estilo.topo}>
                    <Text style={estilo.textoTopo}>Editar Tarefa</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={estilo.cadastrarTarefa}>
                <View style={estilo.itemLista}>
                    <Text style={estilo.rotulo}>Título da tarefa</Text>
                    <TextInput
                        value={titulo}
                        onChangeText={setTitulo}
                        style={estilo.input}
                    />

                    <Text style={estilo.rotulo}>Descrição:</Text>
                    <TextInput
                        value={descricao}
                        onChangeText={setDescricao}
                        multiline={true}
                        numberOfLines={4}
                        style={estilo.inputDescricao}
                    />

                    <Text style={estilo.rotulo}>Responsável:</Text>
                    <TextInput
                        value={responsavel}
                        onChangeText={setResponsavel}
                        style={estilo.input}
                    />

                    <Text style={estilo.rotulo}>Preço (R$):</Text>
                    <TextInput
                        value={preco}
                        onChangeText={setPreco}
                        keyboardType="decimal-pad"
                        style={estilo.input}
                    />

                    <Text style={estilo.rotulo}>Tempo estimado (horas):</Text>
                    <TextInput
                        value={tempo}
                        onChangeText={setTempo}
                        keyboardType="decimal-pad"
                        style={estilo.input}
                    />

                    <Text style={estilo.rotulo}>Prioridade:</Text>
                    <View style={estilo.prioridades}>
                        {PRIORIDADES.map((p) => (
                            <TouchableOpacity
                                key={p}
                                onPress={() => setPrioridade(p)}
                                style={[estilo.botaoPrioridade, prioridade === p && estilo.prioridadeAtiva]}
                            >
                                <Text style={[estilo.textoPrioridade, prioridade === p && estilo.textoPrioridadeAtivo]}>
                                    {p}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={estilo.rotulo}>Tags (separadas por vírgula):</Text>
                    <TextInput
                        value={tags}
                        onChangeText={setTags}
                        autoCapitalize="none"
                        style={estilo.input}
                    />

                    <View style={estilo.acao}>
                        <TouchableOpacity
                            onPress={atualizar}
                            style={estilo.botaoSalvar}
                        >
                            <Text style={estilo.textoBotao}>Atualizar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f7',
    },

    todo: {
        width: '100%',
        alignItems: 'center',
    },

    topo: {
        width: '100%',
        height: 80,
        backgroundColor: '#2563eb',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },

    textoTopo: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    cadastrarTarefa: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    itemLista: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 12,

        borderWidth: 1,
        borderColor: '#e0e0e0',

        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    rotulo: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222',
        marginBottom: 8,
    },

    input: {
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 7,
        height: 40,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 10
    },
    inputDescricao: {
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 7,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 10
    },
    prioridades: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 10,
    },
    botaoPrioridade: {
        flex: 1,
        height: 38,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    prioridadeAtiva: {
        backgroundColor: '#2563eb',
        borderColor: '#2563eb',
    },
    textoPrioridade: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222222',
    },
    textoPrioridadeAtivo: {
        color: '#ffffff',
    },
    acao: {
        width: '100%',
        minHeight: 45,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    botaoSalvar: {
        flex: 1,
        height: 50,
        width: 130,
        marginBottom: 10,
        backgroundColor: '#025e37',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoBotao: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
})