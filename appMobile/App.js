import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import React from "react";
import { NativeRouter, Route, Link, Routes, Outlet } from "react-router-native";
// import Cafe from "./components/coffee/displayCoffee";
import Scanner from './components/qrCode/scanner';
import Header from './components/header';
import { Button } from '@rneui/base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/login/login';
import Cafe from './components/coffee/displayCoffee';

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Scanner"
        onPress={() => navigation.navigate('Scanner')}
      />
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Cafe"
        onPress={() => navigation.navigate('Products')}
      />
    </View>
  );
}

function ScannerScreen() {
  return (
    <Scanner></Scanner>
  )
}

function ProductsScreen() {
  return (
    <Cafe></Cafe>
  )
}

function LoginScreen() {
  return (
    <Login></Login>
  )
}

function App() {

  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Detail">
          <Stack.Screen name="Detail" component={DetailsScreen} />
          <Stack.Screen name="Scanner" component={ScannerScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Products" component={ProductsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      
  );
}

export default App;