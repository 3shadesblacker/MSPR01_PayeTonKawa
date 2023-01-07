export class productRepository {
    
    constructor(){
        this.url = "http://localhost:3001/products";
    }

    fetch(){
        fetch(this.url).then( data => {return data})
    }

}