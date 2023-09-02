import Filter from './filterModel'
import * as view from './filterView'

export default async function(state){
    // view.render();
    // const filter = new Filter();
    // filter.getParams();
    // console.log(filter)

    // создаю объект фильтра
    if (!state.filter) state.filter = new Filter();

    // получаю все параметры с сервера для подстановки в начальные значения фильтра
    // сначала надо ожидать данные с сервера, только потом выполнять следующие операции. Поэтому почти всегда будет исаользоваться await (работат только в паре с async)
    await state.filter.getParams(); 

    // отображение фильтра на странице
    view.render(state.filter.params);

    //делаю запрос на сервер
    await state.filter.getResults();
    state.results = state.filter.result;


    //обновляем счетчик на кнопке
    view.changeButtonText(state.filter.result.length);

    const form = document.querySelector("#filter-form");
    
    form.addEventListener('change', async function(e){
        e.preventDefault;
        // собрали данные из формы и сохранили их в state
        state.filter.query = view.getInput();
        console.log(decodeURIComponent(state.filter.query));
        // получили новые отфильтрованные объекты
        await state.filter.getResults();
        // записали отфильтрованные в основной results
        state.results = state.filter.result;
        view.changeButtonText(state.filter.result.length);

    });

    form.addEventListener('reset', async function (){
        state.filter.query = '';
        await state.filter.getResults();
        view.changeButtonText(state.filter.result.length);
    });

    // отправка формы при нажатии Показать объекты
    form.addEventListener('submit', function (e){
        e.preventDefault();
        // console.log('WOWOWOWOOW!!!');

        // event: это название события, {} - данные, которые хотим передать для выполнения события
        // state.emitter.emit('event:render-listing', {}) ;
        state.emitter.emit('event:render-listing', {});
    })

}