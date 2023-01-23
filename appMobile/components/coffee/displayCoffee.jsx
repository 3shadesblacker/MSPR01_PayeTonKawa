import React, {Component, useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import { productRepository } from '../../services/repositories/productRepositories';

const Cafe = () => {

    let products = new productRepository();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(undefined);

    useEffect( async () => {
        try {
            const response = await fetch('https://reactnative.dev/movies.json');
            const json = await response.json();
            return json.movies;
        } catch (error) {
            console.error(error);
        }
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