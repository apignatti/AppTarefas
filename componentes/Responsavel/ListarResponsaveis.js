import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react";
import api from "../../service/api.js";

export default function ListarResponsaveis({ navigation }) {
    const [responsaveis, setResponsaveis] = useState([]);

    const buscarResponsaveis = async () => {
        try {
            const resposta = await api.get("/responsaveis");
            // Ajuste conforme a estrutura do retorno da sua API (ex: resposta.data.responsaveis ou similar)
            setResponsaveis(resposta.data.d || resposta.data);
        } catch (error) {
            console.log("Erro ao buscar responsáveis: " + (error.response?.data?.mensagem || error.message));
        } finally {
            console.log("Requisição de busca finalizada.");
        }
    };

    useEffect(() => {
        buscarResponsaveis();
    }, []);

    return (
        <View style={estilo.container}>
            <View style={estilo.todo}>
                <View style={estilo.topo}>
                    <Text style={estilo.textoTopo}>Gerenciador de Responsáveis</Text>
                    <TouchableOpacity style={estilo.botaoCadastrar}
                        onPress={() => navigation.navigate('CadastrarResponsavel')}>
                        <Text style={estilo.textoBotao}>+ Novo Responsável</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={estilo.scroll} contentContainerStyle={estilo.listaResponsaveis}>
                    {
                        responsaveis.map((item) => (
                            <View key={item.id} style={estilo.itemLista}>
                                <Text style={estilo.titulo}>{item.nome}</Text>
                                <Text style={estilo.textoItem}>E-mail: {item.email}</Text>
                                <Text style={estilo.textoItem}>Telefone: {item.telefone || "Não informado"}</Text>
                                
                                {item.cargo && <Text style={estilo.textoItem}>Cargo: {item.cargo}</Text>}
                                {item.departamento && <Text style={estilo.textoItem}>Departamento: {item.departamento}</Text>}
                                {item.especialidade && <Text style={estilo.textoItem}>Especialidade: {item.especialidade}</Text>}

                                <View style={estilo.acoes}>
                                    <TouchableOpacity style={estilo.botaoVerMais} onPress={() =>
                                        navigation.navigate('ListarResponsavel', { item })}>
                                        <Text style={estilo.textoBotao}>Ver Mais</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={estilo.botaoEditar} onPress={() =>
                                        navigation.navigate('EditarResponsavel', { item })}>
                                        <Text style={estilo.textoBotao}>Editar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={estilo.botaoExcluir}>
                                        <Text style={estilo.textoBotao}>Excluir</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f7',
    },
    todo: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    topo: {
        width: '100%',
        height: 90,
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    scroll:{
        width: '100%',
    },
    
    listaResponsaveis: {
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
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222222',
        marginBottom: 6,
    },
    textoItem: {
        fontSize: 14,
        color: '#555555',
        marginBottom: 4,
    },
    acoes: {
        width: '100%',
        minHeight: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        gap: 8,
    },
    botaoVerMais: {
        flex: 1,
        height: 38,
        backgroundColor: '#2563eb',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoEditar: {
        flex: 1,
        height: 38,
        backgroundColor: '#16a34a',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoExcluir: {
        flex: 1,
        height: 38,
        backgroundColor: '#dc2626',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoCadastrar: {
        height: 32,
        paddingHorizontal: 15,
        backgroundColor: '#190d75',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoBotao: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '600',
    },
});