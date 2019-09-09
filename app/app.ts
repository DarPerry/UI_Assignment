import Vue from 'vue';

const getWeatherByCity = (city) => `http://api.openweathermap.org/data/2.5/weather?appid=dc884d8347e8b27fc4bbbc265f2e9d3c&q=${city}`;

// =================================================== //

// Your code goes here.

const SetWeatherInfo = (temp, humidity) => {
	const tempTxt: HTMLElement | null = document.getElementById('temp');
	const humidityTxt: HTMLElement | null = document.getElementById('humidity');

	if (tempTxt !== null) tempTxt.innerText = temp;
	if (humidityTxt !== null) humidityTxt.innerText = humidity;
};

new Vue({
	el: '#mount',
	data: {
		message: 'Hello Vue!',
	},
	methods: {
		getWeather(event) {
			event.preventDefault();

			const inputLocation: string = (<HTMLInputElement>document.getElementsByClassName('weather-search__input')[0]).value;
			const endpoint: string = getWeatherByCity(inputLocation);
			const errorMessage: HTMLElement | null = document.getElementById('errorMessage');

			fetch(endpoint)
				.then((response) => {
					return response.json();
				})
				.then(function({ main }) {
					let fahrenheitTemp: number = (main.temp - 273.15) * (9 / 5) + 32;

					if (errorMessage !== null && !errorMessage.classList.contains('hidden')) errorMessage.classList.add('hidden');

					SetWeatherInfo(fahrenheitTemp.toFixed(2).toString(), `${main.humidity}%`);
				})
				.catch(function(error) {
					let searchBar: HTMLElement = document.getElementsByClassName('weather-search__input')[0] as HTMLElement;

					SetWeatherInfo(null, null);

					if (errorMessage !== null && errorMessage.classList.contains('hidden')) errorMessage.classList.remove('hidden');

					searchBar.classList.add('error');
					setTimeout(() => {
						if (!searchBar.style.transitionDuration) searchBar.style.transitionDuration = '1.35s';
						searchBar.classList.remove('error');
					}, 750);

					console.log('Request failed', error);
				});
		},
	},
	template: `
  <div class='weather-search'>
    <h1 class='weather-search__header'>Weather</h1>
    <form id='weather-search__form'>
			<label class='weather-search__label' for='city'>City</label>
			<label id='errorMessage' class='weather-search__label hidden' for='city'>Couldn't Find Location</label>
      <input class='weather-search__input' type='text' placeholder='Show me the weather in...'>
      <button
        class='weather-search__button'
        name='city'
        type='submit'
        v-on:click='getWeather'
      >
        Get Weather
      </button>
    </form>
    <p class='weather-search__text'><strong>Temp: </strong><span id='temp'></span></p>
    <p class='weather-search__text'><strong>Humidity: </strong><span id='humidity'></span></p>
  </div>
  `,
});
