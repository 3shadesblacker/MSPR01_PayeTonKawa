import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from './components/customButton';

export default function App() {
  const [textValue, setTextValue] = React.useState("");
  const [disabledButton, setDisabledButton] = React.useState(true)

  function checkMailValue() {
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    setDisabledButton(!regex.test(textValue));
  }

  return (
    <View style={styles.container}>
      <View style={[styles.container, styles.topContainer]}>
        <Image source={require("./assets/logo.png")} />
        <Text>Paye Ton Kawas</Text>
        <Text>Identification</Text>
        <Text>Afin de vous identifier sur l’application merci de renseigner votre adresse mail.</Text>
      </View>
      <View style={[styles.container, styles.bottomContainer]}>
        <TextInput style={styles.input} placeholder="Adresse mail" value={textValue} onChangeText={(value) => {setTextValue(value); checkMailValue()}} />
        <CustomButton title='Envoyer mail' disabled={disabledButton} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: "center",
    backgroundColor: "#FDF9F0",
    flexDirection: "column"
  },
  topContainer: {
    justifyContent: "flex-end",
    padding: 10
  },
  bottomContainer: {
    justifyContent: "flex-start",
    paddingLeft: 20,
    paddingRight: 20
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderColor: "#F3D496",
    color: "#F3D496",
    borderRadius: 5
  },
});
