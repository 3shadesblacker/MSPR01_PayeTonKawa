import React, {Component, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import { Button } from '@rneui/base';
import { productRepository } from '../../services/repositories/productRepositories';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from '@rneui/base';

const OneCafe = ({itemId, navigation}) => {

    let products = new productRepository();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('token')
          if(value !== null) {
            return JSON.parse(value).token
          }
        } catch(e) {
            setAttempt(true)
            alert(e)
        }
      }

    useEffect( () => {
        getData().then(token => {
            products.fetchOneProduct(token,itemId)
            .then( data => {setData(data);}).then(()=>{setLoading(false);})
        })
    }, [])
    
    if(loading){
        return(
            <View>
                
            </View>
        )
    } else if (!loading) {
        return (
            <View style={{backgroundColor:"#FFE8BC", minHeight:"100%", display:"flex", flexDirection:"column"}}>
                <View style={{alignSelf:"center", width:200, height:200, borderRadius:"10%",backgroundColor:"#F3D496", margin:20}}></View>
                <Text style={{fontSize:"30%", alignSelf:"center"}}>{data.label}</Text>
                <Text style={{fontSize:"15%", padding:10, textAlign:"justify"}}>{data.description}</Text>
            </View>
        );
    }


}
export default OneCafe;