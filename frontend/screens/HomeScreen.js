import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';

const API_URL = 'http://192.168.15.12:3000/api/livros';

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      // Se o campo estiver vazio, busca todos os livros
      fetchBooks();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}?search=${encodeURIComponent(searchText)}`);
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

  // Sempre que apagar todo o texto, busca todos os livros automaticamente
  useEffect(() => {
    if (searchText === '') {
      fetchBooks();
    }
  }, [searchText]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchBooks);
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.container}>
      {/* Campo de busca */}
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <TextInput
          placeholder="Buscar por nome do livro"
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Botão adicionar livro */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Adicionar Livro')}
      >
        <Text style={styles.buttonText}>+ Adicionar Livro</Text>
      </TouchableOpacity>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 8,
  },
  searchButtonText: { color: 'white', fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 20 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
  },
  image: { width: 60, height: 60, marginRight: 10 },
  textContainer: { flex: 1 },
  title: { fontWeight: 'bold' },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: { color: 'white', fontSize: 16 },
});
