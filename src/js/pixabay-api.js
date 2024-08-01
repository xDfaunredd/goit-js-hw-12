import axios from 'axios';

let page = 1;
let perPage = 15;

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '45132355-1a938d4dc3b6908ed12965e8f';

const receiveDataFromServer = async (requestItem, reset = false) => {
  if (reset) {
    page = 1;
  }
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: requestItem,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  });

  const response = await axios.get(`?${searchParams}`);

  page += 1;

  return response.data;
};

export default receiveDataFromServer;
