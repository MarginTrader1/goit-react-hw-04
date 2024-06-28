import { useEffect, useState } from "react";

import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";

import { fetchData } from "../../api.js";

const App = () => {
  const [photos, setPhotos] = useState([]); // фотографии
  const [loading, setLoading] = useState(false); //статус загрузки
  const [error, setError] = useState(false); //стейт для ошибки
  
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true); // делаем статус true для отображение загрузки перед запросом

        const photos = await fetchData(); //запрос на сервер

        setPhotos(photos); //меняем стейт
      } catch (error) {
        setError(true); //меняем стан ошибки на true
      } finally {
        setLoading(false); //после запроса снова меняем статус загрузки на false
      }
    };

    fetchPhotos(); //паттерн запроса на сервер для useEffect
  }, []);

  return (
    <div>
      <SearchBar />
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {loading && <p>Loading data, please wait...</p>}
      {photos.length > 0 && <ImageGallery photos={photos} />}
    </div>
  );
};

export default App;
