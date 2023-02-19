import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import React from "react";
import { NativeRouter, Route, Link, Routes, Outlet } from "react-router-native";
// import Cafe from "./components/coffee/displayCoffee";
import Scanner from './components/qrCode/scanner';
import Header from './components/header';

export default function App() {
  return (
    <NativeRouter>
       <Routes>
        <Route exact path="/" element={<Header />} >
          <Route exact path="/f" element={<Scanner />} />
        </Route>
      </Routes>
    </NativeRouter>
  );
}

AppRegistry.registerComponent("MyApp", () => App);