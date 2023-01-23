import React, {useEffect, useState} from 'react';
import { productRepository } from '../../repository/productsRepository';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';

const DisplayCoffee = () => {
    
    let products = new productRepository();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(undefined);

    const cardHeader = (
        <img alt="une tasse de café" src="images/cafe.jpg" />
    );
    const cardFooter = (
        <span>
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary ml-2" />
        </span>
    );
    
    useEffect( () => {
        products.fetch()
        .then( data => {setLoading(false); setData(data)})
    })

    if(loading){
        return(
            <div>
                <h1>available coffees :</h1>
                <ProgressSpinner/>
            </div>
        )
    }else if(!loading){
        return (
            <div>
                <h1>available coffees :</h1>
               
                
                <div>
                    {data.map((product) => (
                        <Card title={product.name} subTitle="Subtitle" style={{ width: '25em' }} footer={cardFooter} header={cardHeader}>
                        <p className="m-0" style={{lineHeight: '1.5'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                            quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
                        </Card>
                    ))}
                </div>
            </div>
        )

    }
}
export default DisplayCoffee;