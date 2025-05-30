import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const API_URL = 'http://192.168.15.12:3000/api/livros'; // Troque pela URL real quando usar em dispositivo físico

export default function AddBookScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async (fromCamera) => {
    let result;
    if (fromCamera) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'É necessário permitir o uso da câmera.');
        return;
      }
      result = await ImagePicker.launchCameraAsync({ quality: 0.5 });
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'É necessário permitir acesso à galeria.');
        return;
      }
      result = await ImagePicker.launchImageLibraryAsync({ quality: 0.5 });
    }

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddBook = async () => {
    if (!title || !author || !description) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, description, image }),
      });

      Alert.alert('Sucesso', 'Livro adicionado!');
      navigation.goBack(); // Volta para a tela anterior (Home)
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o livro.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        placeholder="Nome do livro"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Autor"
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        placeholder="Descrição"
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={styles.imageButtons}>
        <Button title="Tirar Foto" onPress={() => pickImage(true)} />
        <Button title="Escolher da Galeria" onPress={() => pickImage(false)} />
      </View>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Button title="Salvar Livro" onPress={handleAddBook} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 30
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 15
  },
});
