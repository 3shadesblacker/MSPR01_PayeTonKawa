export class productRepository {
    
    url = "";

    constructor(){
        this.url = "http://localhost:3001/products";
    }

    async fetchC(){
        return await fetch(this.url).then( response => {response.json()}).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
              throw error;
            });
    }

}