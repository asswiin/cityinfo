import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/welcomescreen';
import LoginScreen from './src/loginscreen';
import RegisterScreen from './src/registerscreen';
import AdminDashboard from './src/admindashboard';

const Stack =
createNativeStackNavigator();

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen 
        name="AdminDashboard" 
        component={AdminDashboard} />

      </Stack.Navigator>

    </NavigationContainer>

  );
}