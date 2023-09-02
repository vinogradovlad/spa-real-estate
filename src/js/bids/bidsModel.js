export default class Bids {
    constructor() {

    }

   async getBids(){
        try{

        } catch(error){
            alert('Error with getting Bids')
            console.log(error);
        }
        const queryString = `https://jsproject.webcademy.ru/bids`;
       const response = await fetch(queryString);
       const data = await response.json();
       this.bids = await data;
    }
}