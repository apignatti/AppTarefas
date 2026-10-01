import { Text, View, StyleSheet, ScrollView } from "react-native";

const formatarData = (data) => data ? new Date(data).toLocaleDateString('pt-BR') : '-';

export default function ListarTarefa({ route }) {
    const { item } = route.params;

    return (
        <ScrollView style={estilo.container} contentContainerStyle={estilo.conteudo}>
            <View style={estilo.card}>
                <Text style={estilo.numero}>Tarefa #{item.id}</Text>
                <Text style={estilo.titulo}>{item.titulo}</Text>
                <Text style={estilo.descricao}>{item.descricao}</Text>

                <View style={estilo.divisor} />

                <Text style={estilo.linha}>
                    <Text style={estilo.rotulo}>Responsável: </Text>{item.responsavel?.nome}
                </Text>
                <Text style={estilo.linha}>
                    <Text style={estilo.rotulo}>Status: </Text>{item.status}
                </Text>
                <Text style={estilo.linha}>
                    <Text style={estilo.rotulo}>Prioridade: </Text>{item.prioridade ?? '-'}
                </Text>
                <Text style={estilo.linha}>
                    <Text style={estilo.rotulo}>Preço: </Text>
                    {item.preco != null ? `R$ ${Number(item.preco).toFixed(2).replace('.', ',')}` : '-'}
                </Text>
                <Text style={estilo.linha}>
                    <Text style={estilo.rotulo}>Tempo estimado: </Text>
                    {item.tempo_estimado_horas != null ? `${item.tempo_estimado_horas} h` : '-'}
                </Text>
                <Text style={estilo.linha}>
                    <Text style={estilo.rotulo}>Tags: </Text>{item.tags || '-'}
                </Text>

                <View style={estilo.divisor} />

                <Text style={estilo.data}>Criado em: {formatarData(item.data_criacao ?? item.createdAt)}</Text>
                <Text style={estilo.data}>Atualizado em: {formatarData(item.data_atualizacao ?? item.updatedAt)}</Text>
            </View>
        </ScrollView>
    )
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f7',
    },
    conteudo: {
        padding: 12,
    },
    card: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
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
    numero: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2563eb',
        marginBottom: 4,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222222',
        marginBottom: 8,
    },
    descricao: {
        fontSize: 15,
        color: '#555555',
        lineHeight: 22,
    },
    divisor: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 12,
    },
    linha: {
        fontSize: 15,
        color: '#333333',
        marginBottom: 6,
    },
    rotulo: {
        fontWeight: 'bold',
        color: '#222222',
    },
    data: {
        fontSize: 13,
        color: '#777777',
        marginBottom: 2,
    },
})