import React, {Component, useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';

const Cafe = () => {

    // let products = new productRsepository();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState("coucou");

    useEffect(() => {
        fetch('http://51.38.237.216:3001/products')
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            setData(json)})
        .catch((error) => console.error(error))
    }, []);
    
    if(loading){
        return(
            <View>
                <Text>
                    testtestetstetstetst
                    {data}
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