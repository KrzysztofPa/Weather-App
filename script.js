const inputCityName = document.querySelector('input');
const sendBtn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const windSpeed = document.querySelector('.windSpeed')
const windDirection = document.querySelector('.windDirection')




inputCityName.value = 'Warszawa';
connectAndFill()


sendBtn.addEventListener('click', connectAndFill);

inputCityName.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        connectAndFill()
    }
})

function connectAndFill() {
    const apiReadyLink = `http://api.openweathermap.org/data/2.5/weather?q=${inputCityName.value}&appid=82cd48d88651a90dc6c5a37de63c5a7d&units=metric`;
    axios.get(apiReadyLink)
        .then((res) => {
            windDirection.style.transform = `rotate(${res.data.wind.deg}deg)`
            warning.innerText = '';
            windSpeed.innerText = res.data.wind.speed + 'm/s'
            pressure.innerText = res.data.main.pressure + 'Hpa';
            weather.innerText = res.data.weather[0].main;
            cityName.innerText = res.data.name;
            temperature.innerText = res.data.main.temp.toFixed(0) + '°C';
            humidity.innerText = `${res.data.main.humidity}%`;
            photo.setAttribute('src', `http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`)
            inputCityName.value = '';
        })
        .catch((err) => {
            warning.innerText = 'Please, enter the correct city name';
        })
}