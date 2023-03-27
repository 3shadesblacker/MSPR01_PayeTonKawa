export class productRepository {
    
    url = "";

    constructor(){
        this.url = "http://51.38.237.216:3001/products";
    }

    async fetch(token){
        return await fetch(`${this.url}?token=${token}`).then( response => response.json()).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
              throw error;  
            });
    }

    async fetchOneProduct(token, id){
        return await fetch(`${this.url}/${id}?token=${token}`).then( response => response.json()).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
              throw error;  
        });
    }

}