import React, {Component, useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import { productRepository } from '../../services/repositories/productRepositories';
import CustomButton from '../customButton';

const Cafe = () => {

    let products = new productRepository();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState("coucou");

    useEffect( () => {
        products.fetch()
        .then( data => {setData(data);}).then(()=>{setLoading(false);})
    }, [])
    
    if(loading){
        return(
            <View>
                
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
export default Cafe;