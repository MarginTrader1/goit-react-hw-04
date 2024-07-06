import { useEffect, useState } from "react";

import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import ErrorMesage from "../ErrorMessage/ErrorMessage.jsx";
import NoPhoto from "../NoPhoto/NoPhoto.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import toast, { Toaster } from "react-hot-toast";

import { fetchData } from "../../api.js";
import css from "./App.module.css";

// toaster и его настройки
const notifySuccess = (value) =>
   toast.success(`Photos ${value} successfully loaded!`, {
      duration: 3000,
      position: "top-right",
   });

const notifyError = () =>
   toast.error(`Something wrong, try again!`, {
      duration: 4000,
      position: "top-right",
   });

const App = () => {
   const [photos, setPhotos] = useState([]); // фотографии
   const [loading, setLoading] = useState(false); //стейт для статуса загрузки
   const [error, setError] = useState(false); //стейт для ошибки
   const [page, setPage] = useState(1); //стейт для пагинации
   const [topic, setTopic] = useState(""); //стейт для поискового запроса
   const [totalPhoto, setTotalPhoto] = useState(0); //стейт для количества фото
   const [modalIsOpen, setIsOpen] = useState(false); //стейт для статуса модалки
   const [modalPhoto, setModalPhoto] = useState(""); //cтейт для фото модалки

   // фнукции для модалки
   function openModal(value) {
      setIsOpen(true);

      const photo = photos.filter((item) => item.id.includes(value)); //объект с фоткой
      const { regular } = photo[0].urls; // ссылка на фото для модалки
      setModalPhoto(regular);
   }

   function closeModal() {
      setIsOpen(false);
   }

   // функция для пагинации
   const loadMore = () => {
      setPage((prevPage) => prevPage + 1);
   };

   // функция поиск по запросу
   const searchPhotos = (value) => {
      setPhotos([]);
      setTopic(value);
      setPage(1); //поиск с первой странички
   };

   useEffect(() => {
      const fetchPhotos = async () => {
         if (topic === "") {
            return; // ранний возврат если топик пустой, нужен при первой загрузке страницы
         }

         try {
            setLoading(true); // делаем статус true для отображение загрузки перед запросом
            setError(false); // сброс ошибки на false
            const { results, total } = await fetchData(topic, page); //запрос на сервер
            if (results.length > 0) {
               notifySuccess(topic);
            }
            setTotalPhoto(total); // ставим общее количество фоток
            setPhotos((prevState) => {
               return [...prevState, ...results]; // меняем стейт после получения данных
            });
         } catch (error) {
            setError(true); //меняем стан ошибки на true
            notifyError();
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
         {photos.length === 0 && topic !== "" && !error && <NoPhoto />}
         {loading && <Loader />}
         {photos.length > 0 && <ImageGallery photos={photos} openModal={openModal} />}
         {photos.length > 0 && photos.length !== totalPhoto && <LoadMoreBtn loadMore={loadMore} />}
         <ImageModal
            modalIsOpen={modalIsOpen}
            openModal={openModal}
            closeModal={closeModal}
            photo={modalPhoto}
         />
         <Toaster />
      </div>
   );
};

export default App;
