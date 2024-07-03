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

  // поиск по запросу 
  const searchPhotos = async (topic) => {
    try {
      setPhotos([]); // сбрасываем стейт при новом поиске
      setLoading(true); // делаем статус true для отображение загрузки перед запросом
      setError(false); // сброс ошибки на false
      const newPhotos = await fetchData(topic); //запрос на сервер
      setPhotos(() => newPhotos); //меняем стейт после получения данных
    } catch (error) {
      setError(true); //меняем стан ошибки на true
    } finally {
      setLoading(false); //после запроса снова меняем статус загрузки на false
    }
  };

  // useEffect(() => {
  //   const fetchPhotos = async () => {
  //     try {
  //       setLoading(true); // делаем статус true для отображение загрузки перед запросом

  //       const newPhotos = await fetchData(); //запрос на сервер

  //       setPhotos(() => newPhotos); //меняем стейт
  //     } catch (error) {
  //       setError(true); //меняем стан ошибки на true
  //     } finally {
  //       setLoading(false); //после запроса снова меняем статус загрузки на false
  //     }
  //   };

  //   fetchPhotos(); //паттерн запроса на сервер для useEffect
  // }, []);

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
