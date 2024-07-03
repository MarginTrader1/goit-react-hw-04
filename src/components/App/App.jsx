import { useEffect, useState } from "react";

import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import ErrorMesage from "../ErrorMessage/ErrorMessage.jsx";

import { fetchData } from "../../api.js";
import css from "./App.module.css";

const App = () => {
  const [photos, setPhotos] = useState([]); // фотографии
  const [loading, setLoading] = useState(false); //статус загрузки
  const [error, setError] = useState(false); //стейт для ошибки
  const [page, setPage] = useState(1); //стейт для пагинации
  const [topic, setTopic] = useState(""); //стейт для поискового запроса
  const [totalPhoto, setTotalPhoto] = useState(0); //стейт для количества фото

  // функция для пагинации
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // поиск по запросу
  const searchPhotos = (value) => {
    setPhotos([]); // сбрасываем стейт при новом поиске
    setTopic(value);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      if (topic === "") {
        return; // ранний возврат если топик пустой
      }

      try {
        setLoading(true); // делаем статус true для отображение загрузки перед запросом
        setError(false); // сброс ошибки на false
        const { results, total } = await fetchData(topic, page); //запрос на сервер
        setTotalPhoto(total); // ставим общее количество фоток
        setPhotos((prevState) => {
          return [...prevState, ...results]; // меняем стейт после получения данных
        });
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
      {error && <ErrorMesage />}
      {loading && <Loader />}
      {photos.length > 0 && <ImageGallery photos={photos} />}
      {photos.length > 0 && photos.length !== totalPhoto && (
        <LoadMoreBtn loadMore={loadMore} />
      )}
    </div>
  );
};

export default App;
