import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddBookScreen from './screens/AddBookScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Livros">
        <Stack.Screen name="Livros" component={HomeScreen} />
        <Stack.Screen name="Adicionar Livro" component={AddBookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

