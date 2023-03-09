export class loginRepositories {
    
    constructor(isRevendeur = false){
        this.url = isRevendeur ? "http://192.168.1.79:3001/login" : "http://192.168.1.79:3000/login";
        this.qrCodeUrl = "http://192.168.1.79:3001/qrcode";
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

    async sendQRCode(data){
        return await fetch(this.qrCodeUrl, {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
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