import React from 'react';
import { productRepository } from '../../repository/productsRepository';

let prods = new productRepository();
prods.fetch();

const DisplayCoffee = () => {
    return (
        <div>
            <h1>available coffees :</h1>
        </div>
    )
}

export default DisplayCoffee;