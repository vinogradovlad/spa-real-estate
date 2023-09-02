// карточки с товарами
import * as view from './listingView'; 

export default function(state){
    // рендер контейнера для карточек НА СТАРТЕ РАБОТЫ ПРИЛОЖЕНИЯ (без фильтра)
    view.render();

    // рендер карточек
    state.results.forEach(function(item){
        view.renderCard(item, state.favourites.isFav(item.id));
    });

    // запускаем прослушку клика на сердечки
    addToFavsListener();

    // прослушка сгенерированного события
    state.emitter.subscribe('event:render-listing', () => {
        // сначала очистить контейнер с карточками
        view.clearListingContainer();
        // рендер карточек ПОСЛЕ ПРИМЕНЕНИЯ ФИЛЬТРА
        state.results.forEach(function(item){
            view.renderCard(item, state.favourites.isFav(item.id));
        // запускаем функцию добавления в избранное при клике сердечек при работе фильтра
         addToFavsListener();
        
        });
    });

    // функция для нахождения элементов с иконками сердечек и добавления карточек в избранное
    function addToFavsListener(){
        Array.from(document.getElementsByClassName('card__like')).forEach((item) => {
            item.addEventListener('click', (e) => {
               e.preventDefault();
                // находим ID объекта по которому кликнули
               const currentId = e.target.closest('.card').dataset.id;
    
               // добавляем/убираем элемент из избранного
               state.favourites.toggleFav(currentId);
                // включаем/выключаем иконку избранного
               view.toggleFavouriteIcon(e.target.closest('.card__like'),state.favourites.isFav(currentId));
            })
        })
    }


} 