const API_KEY = '22062260-6c25df741ce11e2802dec385a';
const BASE_URL = 'https://pixabay.com/api';

function fetchImage(query, page) {
  const url = `${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`Изображение с именем ${query} отсутствует`),
    );
  });
}

const api = {
  fetchImage,
};

export default api;
