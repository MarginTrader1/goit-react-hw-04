import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ photos, openModal }) => {
   return (
      <ul className={css.list}>
         {photos.map(({ id, description, urls: { small } }) => {
            return (
               <li key={id}>
                  <ImageCard description={description} url={small} openModal={openModal} id={id} />
               </li>
            );
         })}
      </ul>
   );
};

export default ImageGallery;
