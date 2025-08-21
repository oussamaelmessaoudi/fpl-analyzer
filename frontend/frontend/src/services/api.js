import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/fpl";

export const fetchFplStats = async (userId) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/${userId}`);

        return response.data;
    }catch(error){
        throw(error);
    }
}