import React, {Component, useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import { productRepository } from '../../services/repositories/productRepositories';
import CustomButton from '../customButton';

const LoginForm = () => {

    let products = new productRepository();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState("");

    useEffect( () => {
        products.fetch()
        .then( data => {setData(data);}).then(()=>{setLoading(false);})
    }, [])
    
    if(loading){
        return(
            <View>
                {!loading && <Text>test</Text>}
                <Text>
                    Paye ton kawa
                </Text>
                <Text>
                    Identification
                </Text>
                <Text>
                    Afin de vous identifier sur l'application, merci de renseigner votre adresse mail ainsi que votre mot de passe.
                </Text>
                <CustomButton key={"é"}  title={"Valider"}/>
            </View>
        )
    } else if (!loading) {
        return (
            <View>
                <Text>
                    {data.map((product) => (
                        product.name
                    ))}
                </Text>
            </View>
        );
    }


}
export default LoginForm;