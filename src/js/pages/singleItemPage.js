import singleItem from './../singleItem/singleItemController' 

export default function (state) {

	// очищаем контейнер, так как для начала надо очистить страницу от элементов с прошлой страницы и только потом загрузить новые
	document.querySelector('#app').innerHTML = '';

	singleItem(state);
}
