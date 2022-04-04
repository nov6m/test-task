import axios from 'axios'
import { baseUrl } from '@/core/config'
class WeatherApi {
    _baseUrl: string;
    constructor(baseUrl : string) {
        this._baseUrl = baseUrl;
    }
    getLocationInfo(city : string) {
        return axios.get(`${baseUrl}/geo/1.0/direct?q=${city}&limit=5&appid=e5f2ed177e27ea8fd94eeba4f028e98b`);
    }
    getWeather(lat: number, lon: number) {
        return axios.get(`${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e5f2ed177e27ea8fd94eeba4f028e98b`);
    }
}

export default new WeatherApi(baseUrl)