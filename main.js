const formSearch = document.querySelector('.form-search'),
			inputCitiesFrom = document.querySelector('.input__cities-from'),
			dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
			inputCitiesTo = document.querySelector('.input__cities-to'),
			dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
			inputDateDepart = document.querySelector('.input__date-depart');

// data
const citiesAPI ='cities.json',
			proxy = 'https://cors-anywhere.herokuapp.com/',
			TOKEN = '5a698271669a44e9d72c2cdb7c2db57b',
			CALENDAR = 'http://min-prices.aviasales.ru/calendar_preload'; 
// http://api.travelpayouts.com/data/ru/cities.json
let city  = [];


const getData = (url, callback) => {
	const request  = new XMLHttpRequest();

	request.open('GET', url);

	request.addEventListener('readystatechange', () =>{
		if (request.readyState !== 4) return;
 
		if (request.status === 200) {
			callback(request.response);		
		} else{
			console.error(request.status)
		}
	});

	request.send();
};




const showCity = (input, list) => {
	list.textContent = '';

	if (input.value !== '') {

		const filterCity = city.filter((item) => {
		// if (item.name_translations.en) {
			const fixItem = item.name_translations.en.toLowerCase(); //or you can here put item.name for Russian city's name
			return fixItem.includes(input.value.toLowerCase())
			// }
		})
		filterCity.forEach((item) => {
			const li = document.createElement('li');
			li.classList.add('​dropdown__city');
			li.textContent = item.name_translations.en; //or you can here put item.name for Russian city's name
			list.append(li)
		})
	}
}

const selectCity = (event, input, list) => {
	const target = event.target

	if (target.tagName.toLowerCase() === 'li') {
		input.value = target.textContent;
		list.textContent = ''
	}
}
	// events

inputCitiesFrom.addEventListener('input', () => {
	showCity(inputCitiesFrom, dropdownCitiesFrom)
})

inputCitiesTo.addEventListener('input', () => {
	showCity(inputCitiesTo, dropdownCitiesTo)
})

dropdownCitiesFrom.addEventListener('click', (event) => {
	selectCity(event, inputCitiesFrom, dropdownCitiesFrom);
});

dropdownCitiesTo.addEventListener('click', (event)=> {
	selectCity(event, inputCitiesTo, dropdownCitiesTo);
});


// functions calls
getData(citiesAPI, (data) => {
	city = JSON.parse(data).filter(item => item.name_translations.en);
	});
