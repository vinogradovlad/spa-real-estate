export default class Favourites {
    constructor() {
            this.favs = [];
            // загружаем из local storage
            this.readStorage();
    }

    // метод в классе, поэтому без function
    addFav(id){
            this.favs.push(id);
            // сохраняем в local storage
            this.saveData();

    };

    removeFav(id){
        const index = this.favs.indexOf(id);
        this.favs.splice(index, 1); 
            // сохраняем в local storage
        this.saveData();


    };

    isFav(id){
       return this.favs.indexOf(id) !== -1 ? true : false;
    }


    toggleFav(id){
        this.isFav(id) ? this.removeFav(id) : this.addFav(id); 
        // if (this.favs.indexOf(id) !== -1) {
        //     // элемент есть в массиве - удаляем
        //     this.removeFav(id);
        // } else {
        //     // елемента нет в массиве - добавляем
        //     this.addFav(id);
        // }
    }

    saveData(){
        localStorage.setItem('favs', JSON.stringify(this.favs))
    }

    readStorage(){
       const storage = JSON.parse(localStorage.getItem('favs'));
       if (storage) this.favs = storage;
    }
}