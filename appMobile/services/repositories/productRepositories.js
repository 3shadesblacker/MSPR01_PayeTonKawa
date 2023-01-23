export class productRepository {
    
    constructor(){
        this.url = "http://51.38.237.216:3001/";
    }

    async fetchC(){
        return await fetch(this.url).then( response => { debugger; response.json()}).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
              throw error;
            });
    }

}