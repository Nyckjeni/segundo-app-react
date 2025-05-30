import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

const API_URL = 'http://192.168.15.12:3000/api/livros'; // Troque por sua URL real se for no dispositivo físico

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      setLoading(true); // <- Adicionado para mostrar carregamento ao voltar
      const response = await fetch(API_URL);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id) => {
    try {
      await fetch(`${API_URL}/${id}/favorite`, { method: 'PATCH' });
      fetchBooks();
    } catch (error) {
      console.error('Erro ao favoritar livro:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchBooks);
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum livro cadastrado.</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.author}</Text>
              <Text>{item.description}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(item._id)}>
              <Text style={{ fontSize: 24 }}>{item.favorite ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Adicionar Livro')} // <-- sem função aqui, está certo!
      >
        <Text style={styles.buttonText}>+ Adicionar Livro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  empty: { textAlign: 'center', marginTop: 20 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8
  },
  image: { width: 60, height: 60, marginRight: 10 },
  textContainer: { flex: 1 },
  title: { fontWeight: 'bold' },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: { color: 'white', fontSize: 16 }
});
