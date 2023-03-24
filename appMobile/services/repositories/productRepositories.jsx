export class productRepository {
    
    url = "";

    constructor(){
        this.url = "http://localhost:3001/products";
    }

    async fetch(){
        return await fetch(`${this.url}?token=29b21358106e239b90dd1458bd493fdbc9a96b84`).then( response => response.json()).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
              throw error;  
            });
    }

    async fetchOneProduct(id){
        return await fetch(`${this.url}/${id}?token=29b21358106e239b90dd1458bd493fdbc9a96b84`).then( response => response.json()).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
              throw error;  
        });
    }

}