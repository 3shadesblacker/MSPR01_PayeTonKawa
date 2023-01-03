export class productRepository {
    
    constructor(){
        this.url = "http://localhost:5000/products";
    }

    fetch(){
        fetch(this.url).then( data => {return data})
    }

}