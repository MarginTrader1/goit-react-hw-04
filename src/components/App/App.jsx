import { useEffect, useState } from "react";

import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader.jsx";

import { fetchData } from "../../api.js";
import css from "./App.module.css";

const App = () => {
  const [photos, setPhotos] = useState([]); // фотографии
  const [loading, setLoading] = useState(false); //статус загрузки
  const [error, setError] = useState(false); //стейт для ошибки
  const [searchWord, setSearchWord] = useState(""); //стейт для поиска слова

  const searchPhotos = (newPhotos) => {
    setSearchWord(newPhotos);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        if (photos.length === 0) {
          return;
        }
        setLoading(true); // делаем статус true для отображение загрузки перед запросом

        const photos = await fetchData(searchWord); //запрос на сервер

        setPhotos(() => photos); //меняем стейт
      } catch (error) {
        setError(true); //меняем стан ошибки на true
      } finally {
        setLoading(false); //после запроса снова меняем статус загрузки на false
      }
    };

    fetchPhotos(); //паттерн запроса на сервер для useEffect
  }, [searchWord]);

  return (
    <div className={css.container}>
      <SearchBar searchPhotos={searchPhotos} />
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {loading && <Loader />}
      {photos.length > 0 && <ImageGallery photos={photos} />}
    </div>
  );
};

export default App;
