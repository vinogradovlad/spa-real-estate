import FavouritesCards from './favouritesCardsModel'
import * as view from './favouritesCardsView'

export default async function(state){
    // получение списка объектов в избранном
    const favsList = state.favourites.favs;

    // получение данных для карточек в избранном с сервера 
    const favouritesCards = new FavouritesCards(favsList);
    await favouritesCards.getFavs();

    // отображаем контейнер и карточки
    view.renderPage(favouritesCards.cards);
    
        // запускаем прослушку клика на сердечки
        addToFavsListener();
    
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