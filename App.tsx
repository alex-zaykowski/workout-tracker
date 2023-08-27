import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import React from 'react';
import CreateScreen from './ui/screens/CreateScreen';
import HomeScreen from './ui/screens/HomeScreen';
import SettingsScreen from './ui/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" />
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="create"
        component={CreateScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
