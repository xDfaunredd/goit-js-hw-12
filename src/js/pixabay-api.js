import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '45132355-1a938d4dc3b6908ed12965e8f';

const receiveDataFromServer = async ({ page, perPage, q }) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  });

  const response = await axios.get(`?${searchParams}`);

  return response.data;
};

export default receiveDataFromServer;
