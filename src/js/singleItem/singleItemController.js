import SingleItem from "./singleItemModel"
import * as view from "./singleItemView"

export default async function(state){
    // создаем объект со свойством id открытой страницы
    state.singleItem = new SingleItem(state.routeParams)
    await state.singleItem.getItem();

    // отрисовываем разметку

    view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id)); // для перерисовки кнопки избранного при нажатии, передаю второй параметр



    // ЗАПУСТИТЬ ПРОСЛУШКУ СОБЫТИЙ (модальное окно)
    // 1. открытие модального окна при нажатии Забронировать
    document.querySelector('.button-order').addEventListener('click', () => {
            view.showModal();
    })
   
    // 2. закрытие модального окна при нажатии Закрыть
    document.querySelector('.modal__close').addEventListener('click', () => {
            view.hideModal();
    })

    // 3. закрытие модального окна при нажатии вне модального окна - оверлей
    document.querySelector('.modal-wrapper').addEventListener('click', (e) => { // передаем аргумент e, так как будем смотреть, где же кликнули
        if (e.target.closest('.modal')){
            return null;
        } else {
            view.hideModal();
        }
    });

    // 4. отправка формы при нажатии Отправить заявку
    // нахожу форму
    document.querySelector('.modal__form').addEventListener('submit', async function(e){ // не стрелочная функция, потому что будет асинхронная
        e.preventDefault();
        const formData = view.getInput();

       await state.singleItem.submitForm(formData);
       const response = state.singleItem.response;

       if (response.message === 'Bid Created') {
        alert('Ваша заявка получена!');
        view.hideModal();
        view.clearInput();
       } else if (response.message === 'Bid Not Created') {
        response.errors.forEach(item => {
            alert(item);    
        });;
    }
    })

    // 5. Клик по кнопке Добавить в избранное (на странице с одной квартирой)
    document.querySelector('#addToFavouriteBtn').addEventListener('click', () => {
        state.favourites.toggleFav(state.singleItem.id);

        view.toggleFavouriteButton(state.favourites.isFav(state.singleItem.id))
    })
}