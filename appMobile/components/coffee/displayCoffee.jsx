import React, {Component, useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';

const Cafe = () => {

    // let products = new productRsepository();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState("coucou");

    useEffect( () => {
        products.fetchC()
        .then( data => {setLoading(false); setData(data)})
    })
    
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