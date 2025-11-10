require('dotenv').config();
const axios = require('axios');

// Get the city name from command line arguments
const city = process.argv[2];

if (!city) {
    console.log('Please provide a city name as an argument');
    console.log('Example: node index.js London');
    process.exit(1);
}

const API_KEY = process.env.OPENWEATHER_API_KEY;

if (!API_KEY) {
    console.log('Please set your OpenWeather API key in the .env file');
    process.exit(1);
}

async function getWeather(city) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        const temperature = response.data.main.temp;
        console.log(`Temperature is ${temperature} degree celsius`);
    } catch (error) {
        if (error.response) {
            console.log('Error:', error.response.data.message);
        } else {
            console.log('Error fetching weather data');
        }
    }
}

getWeather(city);