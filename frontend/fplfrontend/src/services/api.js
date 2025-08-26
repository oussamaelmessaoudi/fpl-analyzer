import axios from 'axios';

const BASE_URL = 'http://localhost:8080/fpl';

export const fetchFplStats = async (userId) =>{
    try{
        const response = await axios.get(`${BASE_URL}/${userId}`);

        return response.data;
    }catch(error){
        throw error;
    }
}