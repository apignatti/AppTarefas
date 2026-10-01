import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import api from "../../service/api.js";

export default function EditarResponsavel({ route, navigation }) {
    const id = route.params.item.id;
    const [responsavel, setResponsavel] = useState([]);

    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [foto, setFoto] = useState("");
    const [especialidade, setEspecialidade] = useState("");
    const [cargo, setCargo] = useState("");
    const [departamento, setDepartamento] = useState("");

    const buscarResponsavel = async () => {
        try {
            const resposta = await api.get(`/responsavel/${id}`);
            const respResponsavel = resposta.data.responsavel || resposta.data;
            
            setResponsavel(respResponsavel);
            setNome(respResponsavel.nome || "");
            setTelefone(respResponsavel.telefone || "");
            setEmail(respResponsavel.email || "");
            setSenha(respResponsavel.senha || "");
            setFoto(respResponsavel.foto || "");
            setEspecialidade(respResponsavel.especialidade || "");
            setCargo(respResponsavel.cargo || "");
            setDepartamento(respResponsavel.departamento || "");
        } catch (error) {
            const mensagemErro = error.response?.data?.erro || error.response?.data?.mensagem || error.message;
            console.log("Erro ao buscar responsável: " + mensagemErro);
        } finally {
            console.log("Busca de responsável finalizada.");
        }
    };

    useEffect(() => {
        buscarResponsavel();
    }, []);

    const atualizar = async () => {
        if (!nome?.trim() || !email?.trim()) {
            Alert.alert("Atenção", "Os campos Nome e E-mail são obrigatórios!");
            return;
        }

        try {
            await api.put(`/responsavel/${id}`, {
                nome,
                telefone,
                email,
                senha,
                foto,
                especialidade,
                cargo,
                departamento
            });

            Alert.alert("Sucesso", "Responsável atualizado com sucesso!", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            const mensagemErro = error.response?.data?.mensagem || "Erro ao atualizar o responsável!!!";
            Alert.alert("Erro", mensagemErro);
            console.log("Erro ao atualizar o responsável:", mensagemErro);
        }
    };

    return (
        <View style={estilo.container}>
            <View style={estilo.todo}>
                <View style={estilo.topo}>
                    <Text style={estilo.textoTopo}>Editar Responsável</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={estilo.cadastrarResponsavel}>
                <View style={estilo.itemLista}>
                    <Text style={estilo.rotulo}>Nome *</Text>
                    <TextInput
                        value={nome}
                        onChangeText={setNome}
                        style={estilo.input}
                    />

                    <Text style={estilo.rotulo}>E-mail *</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={estilo.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={estilo.rotulo}>Senha</Text>
                    <TextInput
                        value={senha}
                        onChangeText={setSenha}
                        style={estilo.input}
                        secureTextEntry={true}
                    />

                    <Text style={estilo.rotulo}>Telefone</Text>
                    <TextInput
                        value={telefone}
                        onChangeText={setTelefone}
                        style={estilo.input}
                        keyboardType="phone-pad"
                    />

                    <Text style={estilo.rotulo}>Cargo</Text>
                    <TextInput
                        value={cargo}
                        onChangeText={setCargo}
                        style={estilo.input}
                    />

                    <Text style={estilo.rotulo}>Departamento</Text>
                    <TextInput
                        value={departamento}
                        onChangeText={setDepartamento}
                        style={estilo.input}
                    />

                    <Text style={estilo.rotulo}>Especialidade</Text>
                    <TextInput
                        value={especialidade}
                        onChangeText={setEspecialidade}
                        style={estilo.input}
                    />

                    <Text style={estilo.rotulo}>Foto (URL)</Text>
                    <TextInput
                        value={foto}
                        onChangeText={setFoto}
                        style={estilo.input}
                        autoCapitalize="none"
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
    );
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
    textoTopo: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    cadastrarResponsavel: {
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    rotulo: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#222222',
        marginBottom: 6,
    },
    input: {
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 7,
        height: 40,
        paddingHorizontal: 12,
        marginBottom: 10,
        backgroundColor: '#fafafa',
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
        width: '100%',
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
});