import {React, useState} from "react";
import { Input, Icon, CheckBox } from '@rneui/themed';
import { View, Text } from "react-native";
import { Button } from "@rneui/base";
import { loginRepositories } from '../../services/repositories/loginRepositories';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import Scanner from "../qrCode/scanner";

const  Login = () => {

    const [login, setLogin] = useState("admin");
    const [password, setPassword] = useState("adminkawa");
    const [isRevendeur, setIsRevendeur ] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLogged, setIsLogged] = useState(false)
    const [email, setEmail] = useState("gaillegue.eliot@gmail.com");
    const [token, setToken] = useState();
    const navigation = useNavigation();

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('token', JSON.stringify(value))
        } catch (e) {
          alert(e)
        }
    }
 
    if(!isSubmit){
        return( 
        <View>
            <Input
                placeholder='email'
                value={login}
                onChangeText={(e) => setLogin(e)}
            />
            <Input
                placeholder='mot de passe'
                value={password}
                onChangeText={(e) => setPassword(e)}
            />
            <CheckBox title="Je suis un revendeur" onIconPress={() => {setIsRevendeur(!isRevendeur)}} checked={isRevendeur}></CheckBox>
            {isRevendeur ? (
            <Input
                placeholder='email'
                value={email}
                onChangeText={(e) => setEmail(e)}
            />
            ) : (<></>)}
            <Button title={"Submit"} onPress={() => {setIsSubmit(true)}}></Button>
        </View>
        )
    }else if(isSubmit && !isLogged){

        let loginRepository = new loginRepositories(isRevendeur);

            loginRepository.send({
                login: {login},
                password: {password}
            }).then(
                res => { storeData({token: res.token, isRevendeur: isRevendeur}); setIsLogged(true)},
                rejected => {alert("mauvais identifiants 😿"); setIsSubmit(false)}
            )
        

    }else if(isSubmit && isLogged){

        let text = isRevendeur ? "un email contenant un qrcode vous a été envoyé 📫, scannez le afin de terminer le processus de connexion" : "vous êtes connecté.e 👏"

        if(!isRevendeur){
            setTimeout(()=> { navigation.navigate("Home",{loggedIn: true})}, 2000)
        }

        return(
            <View>
                <Text>{text}</Text>
                {isRevendeur ? (<Scanner></Scanner>) : (<></>)}
            </View>
        )
    }
}
export default Login;