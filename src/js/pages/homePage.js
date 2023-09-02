import filter from './../filter/filterController'
import listing from './../listing/listingController'


export default async function (state){
    // очищаем контейнер от предыдущих разметок с других страниц
	document.querySelector('#app').innerHTML = '';
    
    await filter(state);
    listing(state);
}