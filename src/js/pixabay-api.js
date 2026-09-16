import axios from 'axios';

// 'твій_ключ';
const API_KEY = '57471701-99d02be1d10482722832ebff7';

export async function getImagesByQuery(query, page) {
  const { data } = await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      page: page,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return data;
}
