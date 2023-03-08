export class loginRepositories {
    
    url = "";

    constructor(){
        this.url = "http://localhost:3000/login";
    }

    async send(data){
        return await fetch(this.url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then( response => response.json()).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
              throw error;  
            });
    }

}