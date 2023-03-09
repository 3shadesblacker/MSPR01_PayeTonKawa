import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import {React, useState} from "react";
// import Cafe from "./components/coffee/displayCoffee";
import Scanner from './components/qrCode/scanner';
import { Button } from '@rneui/base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/login/login';
import Cafe from './components/coffee/displayCoffee';
import AsyncStorage from "@react-native-async-storage/async-storage";

function DetailsScreen({ navigation }) {

  const [isLogged, setIsLogged] = useState(false)
  const [endUser, setEndUser] = useState();
  const [attempt, setAttempt] = useState(false)

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if(value !== null) {
        setIsLogged(true)
        setEndUser(JSON.parse(value));
        setAttempt(true)
      }
    } catch(e) {
        setAttempt(true)
        alert(e)
    }
  }

  const removeValue = async () => {
      try {
        await AsyncStorage.removeItem('token')
        setEndUser();
        console.log("storage cleared")
      } catch(e) {
        alert(e)
      }
  }

  if(!attempt){
    getData();
  }
  
  if(isLogged){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Que souhaitez vous faire ?</Text>
        <Button
          title="Scanner"
          onPress={() => navigation.navigate('Scanner')}
        />
        <Button
          title="Cafe"
          onPress={() => navigation.navigate('Products')}
        />
        <Button
          title="Déconnexion"
          onPress={() => {removeValue().then(() => {setIsLogged(false); setAttempt(false)})}}
        />
      </View>
    );
  }else{
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Que souhaitez vous faire ?</Text>
        <Button
          title="Login"
          onPress={() => {setIsLogged(false); setAttempt(false); navigation.navigate('Login')}}
        />
      </View>
    )
  }
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
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={DetailsScreen} />
          <Stack.Screen name="Scanner" component={ScannerScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Products" component={ProductsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;