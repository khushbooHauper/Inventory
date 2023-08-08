import axios from 'axios';

const getUsers = (API_URL:string) =>{
  return axios.get(API_URL);
}

export default getUsers
