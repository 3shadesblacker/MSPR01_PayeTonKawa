export class productRepository {
    
    constructor(){
        this.url = "http://localhost:3001/products";
    }

    fetch(){
        return fetch(this.url).then( response => response.json())
    }

}