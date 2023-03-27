import {React, useState} from "react";
import { Input, Icon, CheckBox } from '@rneui/themed';
import { View, Text } from "react-native";
import { Button } from "@rneui/base";
import { loginRepositories } from '../../services/repositories/loginRepositories';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Scanner from "../qrCode/scanner";

const  Login = ({navigation}) => {

    const [login, setLogin] = useState("admin");
    const [password, setPassword] = useState("adminkawa");
    const [isRevendeur, setIsRevendeur ] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLogged, setIsLogged] = useState(false)
    const [email, setEmail] = useState("gaillegue.eliot@gmail.com");
    const [token, setToken] = useState();

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('token', JSON.stringify(value))
        } catch (e) {
          alert(e)
        }
    }
 
    if(!isSubmit){
        return( 
        <View style={{backgroundColor:"#FFE8BC", minHeight:"100%"}}>
            <View style={{display:"flex", width:"100%", height:"50%", justifyContent:"center", alignItems:"center"}}>
                <View style={{borderRadius:"100%", backgroundColor:"#F3D496", height:150, width:150}}>
                </View>
                <Text style={{marginTop: "10%", fontSize: "20%"}}>Paye Ton Kawa</Text>
                <Text style={{marginTop: "10%", fontSize: "15%", textAlign:"center", paddingRight:"2%", paddingLeft:"2%"}}>Afin de vous identifier sur l'application, merci de renseigner votre nom d'utilisateur, mot de passe et adresse email.</Text>
            </View>
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
            {/* <CheckBox title="Je suis un revendeur" onIconPress={() => {setIsRevendeur(!isRevendeur)}} checked={isRevendeur}></CheckBox> */}
            {isRevendeur ? (
            <Input
                placeholder='email'
                value={email}
                onChangeText={(e) => setEmail(e)}
            />
            ) : (<></>)}
            <Button
            buttonStyle={{
                backgroundColor:"#F3D496",
                borderRadius: "10%",
                width:"70%",
                alignSelf:"center"
            }} 
            title={"Envoyer email"}
            onPress={() => {setIsSubmit(true)}}></Button>
        </View>
        )
    }else if(isSubmit && !isLogged){

        let loginRepository = new loginRepositories(isRevendeur);

            loginRepository.send({
                login,
                password
            }).then(
                res => {
                loginRepository.sendQRCode({
                    to: email,
                    token: res.token
                }).then(setIsLogged(true))
            },
                rejected => {alert("mauvais identifiants 😿"); setIsSubmit(false)}
            )
        

    }else if(isSubmit && isLogged){

        let text = isRevendeur ? "un email contenant un qrcode vous a été envoyé 📫, scannez le afin de terminer le processus de connexion" : "vous êtes connecté.e 👏"

        if(!isRevendeur){
            setTimeout(()=> { navigation.navigate("Home",{loggedIn: true})}, 2000)
        }

        return(
            <View style={{backgroundColor:"#FFE8BC", minHeight:"100%"}}>
                <View style={{display:"flex", width:"100%", height:"50%", justifyContent:"center", alignItems:"center"}}>
                    <View style={{borderRadius:"100%", backgroundColor:"#F3D496", height:150, width:150}}>
                    </View>
                    <Text style={{marginTop: "10%", fontSize: "20%"}}>Paye Ton Kawa</Text>
                    <Text style={{marginTop: "10%", fontSize: "15%", textAlign:"center", paddingRight:"2%", paddingLeft:"2%"}}>Un QR code vous a été envoyé par email !</Text>
                </View>
                {isRevendeur ? (<Scanner navigation={navigation}></Scanner>) : (<></>)}
            </View>
        )
    }
}
export default Login;