import { useEffect, useState } from "react";

import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";

import { fetchData } from "../../api.js";
import css from "./App.module.css";

const App = () => {
  const [photos, setPhotos] = useState([]); // фотографии
  const [loading, setLoading] = useState(false); //статус загрузки
  const [error, setError] = useState(false); //стейт для ошибки
  const [page, setPage] = useState(1); //стейт для пагинации
  const [topic, setTopic] = useState(""); //стейт для поискового запроса

  // функция для пагинации
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // поиск по запросу
  const searchPhotos = (value) => {
    setTopic(value);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      if (topic === "") {
        return; // ранний возврат если топик пустой
      }

      try {
        setPhotos([]); // сбрасываем стейт при новом поиске
        setLoading(true); // делаем статус true для отображение загрузки перед запросом
        setError(false); // сброс ошибки на false
        const newPhotos = await fetchData(topic, page); //запрос на сервер
        setPhotos(() => newPhotos); //меняем стейт после получения данных
      } catch (error) {
        setError(true); //меняем стан ошибки на true
      } finally {
        setLoading(false); //после запроса снова меняем статус загрузки на false
      }
    };

    fetchPhotos(); //паттерн запроса на сервер для useEffect
  }, [topic, page]);

  return (
    <div className={css.container}>
      <SearchBar searchPhotos={searchPhotos} />
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {loading && <Loader />}
      {photos.length > 0 && <ImageGallery photos={photos} />}
      {photos.length > 0 && <LoadMoreBtn loadMore={loadMore} />}
    </div>
  );
};

export default App;

// try {
//   setPhotos([]); // сбрасываем стейт при новом поиске
//   setLoading(true); // делаем статус true для отображение загрузки перед запросом
//   setError(false); // сброс ошибки на false
//   const newPhotos = await fetchData(topic); //запрос на сервер
//   setPhotos(() => newPhotos); //меняем стейт после получения данных
// } catch (error) {
//   setError(true); //меняем стан ошибки на true
// } finally {
//   setLoading(false); //после запроса снова меняем статус загрузки на false
// }
