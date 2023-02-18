import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import React from "react";
import { NativeRouter, Route, Link, Routes, Outlet } from "react-router-native";
// import Cafe from "./components/coffee/displayCoffee";
import Scanner from './components/qrCode/scanner';

export default function App() {
  return (
    <NativeRouter>
       <Routes>
        <Route exact path="/" element={<Scanner />} />
      </Routes>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent("MyApp", () => App);