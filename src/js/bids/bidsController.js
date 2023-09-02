import * as view from './bidsView'
import Bids from './bidsModel';    

export default async function(){
    // view.renderContainer();
    // создаем объект для добавления заявок
    if (!state.bids) state.bids = new Bids();

    // получаем заявки с сервера
    await state.bids.getBids(); // функция делает запрос на сервер, поэтому надо подождать - async/await

    // отображаю заявки на странице
    view.renderBids(state.bids.bids);

}