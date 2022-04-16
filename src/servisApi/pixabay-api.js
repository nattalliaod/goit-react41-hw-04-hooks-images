import axios from "axios";

const API_KEY = '23946238-2b787548eaf9d1fdba7d3b0a9';
// 'https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12'

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchPixabay = async (query, page) => {
  return await axios.get(`?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`).then(response => {
      
    if (response.status === 200 && response.data.hits.length !== 0) {
      return response.data;
    }

    return Promise.reject(new Error(`Oops, something went wrong. Enter your query`));
  });
  
};

