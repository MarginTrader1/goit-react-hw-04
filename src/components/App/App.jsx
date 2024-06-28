import { useEffect, useState } from "react";
import axios from "axios";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";

const ACCESS_KEY = "UPw8NjS-huZ4VlBDIIM1Zji-EyFBB8DnsTXGq8PbDP8";

const App = () => {
  const [photos, setPhotos] = useState([]); // фотографии
  const [loading, setLoading] = useState(false); //статус загрузки
  const [searchData, setSearchData] = useState(""); // поиск фото

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true); // делаем статус true для отображение загрузки перед запросом

        //запрос на сервер
        const response = await axios.get(
          `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`
        );

        const photos = response.data; //фотки

        setPhotos(photos); //меняем стейт
      } catch (error) {
        console.log(error); 
      } finally {
        setLoading(false); //после запроса снова меняем статус загрузки на false
      }
    };

    fetchPhotos(); //паттерн запроса на сервер для useEffect
  }, []);

  return (
    <div>
      <SearchBar />
      {loading && <p>Loading data, please wait...</p>}
      {photos.length > 0 && <ImageGallery photos={photos} />}
    </div>
  );
};

export default App;
