export default class Filter {
  // default потмоу что ничего больше не будет экспортировать кроме этого
  constructor() {
    this.query = '';
  }

  async getParams() {
    try {
      const queryString = `https://jsproject.webcademy.ru/itemsinfo`;
      const response = await fetch(queryString); // fetch вернет promise, ждем пока выполнится
      const data = await response.json(); // тоже promise но в виде js объекта
      this.params = await data; // в новом объекте создадим свойство params с данными
    } catch (error) {
      alert(error);
    }
  }

 async getResults() {
    try{
        const queryString = `https://jsproject.webcademy.ru/items${this.query}`;
        const response = await fetch(queryString);
        const data = await response.json();
        this.result = await data;
        console.log(this.result);

    } catch(error) {
        alert(error)
        }
    }
}
