import React, {Component, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import { Button } from '@rneui/base';
import { productRepository } from '../../services/repositories/productRepositories';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

const Cafe = ({navigation}) => {

    let products = new productRepository();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('token')
          if(value !== null) {
            // return JSON.parse(value.token);
          }
        } catch(e) {
            setAttempt(true)
            alert(e)
        }
      }

    useEffect( () => {
        getData().then(() => {
            products.fetch()
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
            <View style={{backgroundColor:"#FFE8BC", minHeight:"100%"}}>
                
                <View style={{display:"flex", flexDirection:"column"}}>
                {data.map((product) => (
                    <View key={product.id} style={{display:"flex",flexDirection:"row", justifyContent:'space-between', marginBottom:10}}>
                        <View style={{width:100, height:100, backgroundColor:"#F3D496", borderRadius:10}} />
                        <View style={{display: "flex"}}>
                            <Text style={{fontSize:"30%"}}> {product.label}</Text>
                            <Text style={{fontSize:"15%"}}> {product.description}</Text>
                        </View>
                        <View style={{justifySelf:"end", display:"flex", width:100, justifyContent:"center", alignItems:"center"}}>
                            <Button 
                            buttonStyle={{
                                backgroundColor:"#F3D496",
                                borderRadius: "100%",
                                width: 50,
                                height:50
                            }}
                            onPress={ () => {
                                navigation.navigate("OneProduct",{
                                    itemId: product.id,
                                }
                                )}}
                            >

                            </Button>
                        </View>
                       
                    </View>
                ))}
                </View>
            </View>
        );
    }


}
export default Cafe;