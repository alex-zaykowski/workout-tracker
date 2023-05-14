import { SafeAreaProvider,useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { UserContext } from './ui/utils/UserContext';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import CreateScreen from "./ui/screens/CreateScreen";
import HomeScreen from "./ui/screens/HomeScreen";
import SettingsScreen from './ui/screens/SettingsScreen';
import User from './ui/utils/User';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userData, setUserData] = useState<User>({defaultWorkout: 'Workout 1'});

  return (
    <UserContext.Provider value={userData}>
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
    </UserContext.Provider>
  );
}
