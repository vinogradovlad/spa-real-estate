export default class FavouritesCards {
    constructor(favsList){
        this.favsList = favsList; // передаем список объектов из избранного
    }

    async getFavs(){
        const ids = this.favsList.toString();
        const queryString = `https://jsproject.webcademy.ru/items?ids=${ids}`;
        const result = await fetch(queryString);
        const data = await result.json();
        this.cards = await data; // создаем новое свойство  cards с данными карточек из избранного с сервера
        console.log(this.cards)
    }
}