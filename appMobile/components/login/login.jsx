import {React, useState} from "react";
import { Input, Icon } from '@rneui/themed';
import { View, Text } from "react-native";
import { Button } from "@rneui/base";
import { loginRepositories } from '../../services/repositories/loginRepositories';


const  Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
 
    if(!isSubmit){
        return( 
        <View>
            <Input
                placeholder='email'
                value={email}
                onChangeText={(e) => setEmail(e)}
            />
            <Input
                placeholder='mot de passe'
                value={password}
                onChangeText={(e) => setPassword(e)}
            />
            <Button title={"Submit"} onPress={() => {setIsSubmit(true)}}></Button>
        </View>
        )
    }else{

        let loginRepository = new loginRepositories();
        loginRepository.send({
            email: {email},
            password: {password}
        })

        return(
            <View>
                <Text>Un email vous a été envoyé</Text>
            </View>
        )
    }
}
export default Login;