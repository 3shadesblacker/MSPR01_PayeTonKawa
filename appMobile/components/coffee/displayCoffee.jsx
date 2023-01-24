import React, { Component, useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import CustomButton from '../customButton';

const Cafe = () => {

    // let products = new productRsepository();/
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState("coucou");

    if (loading) {
        return (
            <View>
                <Text>
                    Paye ton kawa
                    {data}
                </Text>
                <Text>
                    Identification
                </Text>
                <Text>
                    Afin de vous identifier sur l'application, merci de renseigner votre adresse mail ainsi que votre mot de passe.
                </Text>
                <CustomButton title={"Valider"}/>
            </View>
        )
    } else if (!loading) {
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