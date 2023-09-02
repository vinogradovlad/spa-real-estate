export default class SingleItem {
    constructor(id){
        this.id = id;
    }
    
    // это асинхронная функция, поэтому она будет возвращать промис. Значит, при ее вызове в других модулях можно использовать await
    async getItem(){
        try{
            const queryString = `https://jsproject.webcademy.ru/items/${this.id}`;
            const response = await fetch(queryString);
            const data = await response.json(); // преобразуем json в javascript объект, но здесь все еще промис
            this.result = await data; // достаю данные из промиса и записываю в свойство result
        } catch(error) {
            alert(error);
        }
    };

    // data - данные, которые будем передавать в функцию для отправки их на сервер
    async submitForm(formData){
        const queryString = `https://jsproject.webcademy.ru/bidnew`;
        // это fetch, который отправляет данные. В ответ придет промис
        const response = await fetch(queryString, {
            method: 'POST', // метод отправки данных
            headers: {
                'Content-type': 'application/json; charset=UTF-8', // тип контента
            },
            body: JSON.stringify(formData) // сами данные в json формате
        });
        const data = await response.json();
        this.response = await data;
    }
}