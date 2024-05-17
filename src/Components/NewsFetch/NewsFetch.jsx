const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=dharmanagar';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '80788fe660msh2a2d0abcc31a601p196e5bjsnff5e45309623',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};

async function WeatherReport() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
export default WeatherReport;