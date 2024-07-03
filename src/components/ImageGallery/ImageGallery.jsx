import ImageCard from "../ImageCard/ImageCard";
import { nanoid } from "nanoid";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ photos }) => {
  console.log(photos);

  return (
    <ul className={css.list}>
      {photos.map(({ description, urls: { small } }) => {
        return (
          <li key={nanoid()}>
            <ImageCard description={description} url={small} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
