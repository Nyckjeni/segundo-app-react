import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddBookScreen from './screens/AddBookScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import BookDetailsScreen from './screens/BookDetailsScreen';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function HomeStack() {
  return (
    <Stack.Navigator>
      { }
      <Stack.Screen
        name="Lista de Livros"
        component={HomeScreen}
        options={{ title: 'Bibliotecando' }} 
      />
      <Stack.Screen
        name="Adicionar Livro"
        component={AddBookScreen}
        options={{ title: 'Adicionar Livro' }}
      />

      <Stack.Screen name="BookDetails" component={BookDetailsScreen} options={{ title: 'Detalhes do Livro' }} />

    </Stack.Navigator>

    
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Livros') {
              iconName = 'book';
            } else if (route.name === 'Favoritos') {
              iconName = 'heart';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Livros"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Favoritos"
          component={FavoritesScreen}
          options={{ title: 'Favoritos' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
