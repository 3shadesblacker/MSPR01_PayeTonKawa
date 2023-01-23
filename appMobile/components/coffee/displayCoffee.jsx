import React, {Component, useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import { productRepository } from '../../services/repositories/productRepositories';

const Cafe = () => {

    let products = new productRepository();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(undefined);

    useEffect( () => {
        products.fetchC()
        .then( data => {setLoading(false); setData(data)})
    })
    
    if(loading){
        return(
            <View>
                <Text>
                    testtestetstetstetst
                </Text>
            </View>
        )
    }else if(!loading){
        return (
            <View>
                <Text>
                    testtestetstetstetst
                    {data.map((product) => (
                           product.name
                    ))}
                </Text>
            </View>
        );
    }

   
}
export default Cafe;