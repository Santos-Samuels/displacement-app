import api from "./api";

const WeatherService = () => {
  const getAll = () => {
    return api.get(`/v1/weatherforecast`);
  };

  return {
    getAll,
  };
}

export default WeatherService;