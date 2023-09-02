//импорты в main доступны на всех страницах
import homePage from './pages/homePage';
import bidsPage from './pages/bidsPage';
import errorPage from './pages/errorPage';
import favouritesPage from './pages/favouritesPage';
import singleItem from './pages/singleItemPage';
import EventEmitter from './utils/EventEmitter';
import Favourites from './favourites/favouritesModel'; 

const state = {

    // в reaults будут храниться данные, которые получили с помощью filter и отсюда их будеь брать listing
    results: [], 
    // создаю новый объект класса EE
    emitter: new EventEmitter(),
    favourites: new Favourites()
}

// только для тестирования! потом удали!
window.state = state;

// Routes
const routes = [
    {path: '/', component: homePage},
    {path: 'item', component: singleItem},
    {path: 'favourites', component: favouritesPage},
    {path: 'bids', component: bidsPage}
]

function findComponentByPath(path, routes){
    return routes.find(function(route){
        return route.path === path
    })
}

// Router
function router(){
    // то, что написано в адресной строке после # превращаем в массив, разбивая по символу /
   const pathArray = location.hash.split('/');
   
   // устанавливаем путь - либо попадаем на главную, либо туда, куда запрашивает пользователь
   let currentPath = pathArray[0] === '' ? '/' : pathArray[1]; // знак / отвечает за главную страницу
   currentPath = currentPath === '' ? '/' : currentPath; // снова проверяем, что записалось - если пустая строка, то снова сбрасываем на главную, а если не пустая - то сохраняем его

    state.routeParams = pathArray[2] ? pathArray[2] : '';

   const {component = errorPage} = 
   findComponentByPath(currentPath, routes) || {};

    component(state);
} 

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

