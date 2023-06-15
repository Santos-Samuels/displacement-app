import axios from "axios";

const api = axios.create({
  baseURL: 'https://api-deslocamento.herokuapp.com/api/',
});

export default api;