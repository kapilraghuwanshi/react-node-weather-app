const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

const API_KEY = "d37f78971b1063ccf34a287df290899e";

const URL = "https://api.openweathermap.org/data/2.5/weather?" ;

app.get('/getWeatherInfo/', async (req, resp) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    console.log(lat, lon);
    let result;
    // https://api.openweathermap.org/data/2.5/onecall?lat=10&lon=80&appid=d37f78971b1063ccf34a287df290899e
    try {
        result = await axios.get(URL+"lat="+lat+"&lon="+lon+"&appid="+API_KEY);
    } catch(err){
        console.error(`failed due to ${err.message}`);
    }
    resp.json(result.data);
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
})