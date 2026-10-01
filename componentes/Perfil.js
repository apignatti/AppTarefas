import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";

const ID_LOGADO = 1;

// Mock de responsáveis criado diretamente no arquivo
const responsaveisMock = [
    {
        id: 1,
        nome: "Arthur Pignatti",
        telefone: "44-999412353",
        email: "arthur@gmail.com",
        senha: "1234",
        foto: "https://api.dicebear.com/7.x/avataaars/png?seed=Arthur&top=shortFlat&facialHairProbability=0&skinColor=ffdbb4&eyes=default&eyebrows=default&mouth=serious&size=200",
        especialidade: "Backend",
        cargo: "Junior",
        departamento: "TI",
        createdAt: "2025-12-12T00:00:00.000Z",
        updatedAt: "2025-12-12T00:00:00.000Z",

    },



    {
        id: 2,
        nome: "Carlos Souza",
        email: "carlos.souza@email.com",
        telefone: "(41) 99777-6655",
        cargo: "Gerente de Projetos",
        departamento: "Gestão",
        especialidade: "Scrum / Agile",
        foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    }
];

export default function Perfil({ navigation }) {
    const [pessoa, setPessoa] = useState(null);

    useFocusEffect(
        useCallback(() => {
            // Busca o usuário logado no mock com base no ID_LOGADO
            const encontrado = responsaveisMock.find(r => r.id === ID_LOGADO);
            setPessoa(encontrado || null);
        }, [])
    );

    if (!pessoa) {
        return (
            <View style={estilo.containerCarregando}>
                <Text style={estilo.textoCarregando}>Responsável não encontrado.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={estilo.container}>
            <View style={estilo.card}>
                {pessoa.foto ? (
                    <Image source={{ uri: pessoa.foto }} style={estilo.foto} />
                ) : (
                    <View style={estilo.semFoto}>
                        <Text style={estilo.textoSemFoto}>Sem Foto</Text>
                    </View>
                )}

                <Text style={estilo.nome}>{pessoa.nome}</Text>

                {pessoa.cargo && <Text style={estilo.destaque}>{pessoa.cargo}</Text>}
                {pessoa.departamento && <Text style={estilo.texto}>Departamento: {pessoa.departamento}</Text>}
                {pessoa.especialidade && <Text style={estilo.texto}>Especialidade: {pessoa.especialidade}</Text>}

                <Text style={estilo.texto}>E-mail: {pessoa.email}</Text>
                <Text style={estilo.texto}>Telefone: {pessoa.telefone || "Não informado"}</Text>

                <TouchableOpacity
                    style={estilo.botaoEditar}
                    onPress={() => navigation.navigate('EditarResponsavel', { item: pessoa })}
                >
                    <Text style={estilo.textoBotao}>Editar Perfil</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const estilo = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f2f4f7',
        padding: 12,
        paddingTop: 30,
        alignItems: 'center'
    },
    containerCarregando: {
        flex: 1,
        backgroundColor: '#f2f4f7',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoCarregando: {
        fontSize: 16,
        color: '#555555'
    },
    card: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    foto: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: '#2563eb'
    },
    semFoto: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    textoSemFoto: {
        color: '#666666',
        fontSize: 12,
        fontWeight: '600'
    },
    nome: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222222',
        marginBottom: 4,
        textAlign: 'center'
    },
    destaque: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2563eb',
        marginBottom: 8,
    },
    texto: {
        fontSize: 14,
        color: '#555555',
        marginBottom: 4,
        textAlign: 'center'
    },
    botaoEditar: {
        marginTop: 20,
        height: 40,
        width: '100%',
        backgroundColor: '#16a34a',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoBotao: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600'
    },
});