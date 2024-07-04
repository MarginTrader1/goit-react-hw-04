import ImageCard from "../ImageCard/ImageCard";
import { nanoid } from "nanoid";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ photos, openModal }) => {
  return (
    <ul className={css.list}>
      {photos.map(({ id, description, urls: { small } }) => {
        return (
          <li key={id} onClick={() => openModal(id)}>
            <ImageCard description={description} url={small} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
