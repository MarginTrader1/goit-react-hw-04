import ImageCard from "../ImageCard/ImageCard";

import css from "./ImageGallery.module.css";

const ImageGallery = ({ photos }) => {
  console.log(photos);

  return (
    <ul className={css.list}>
      {photos.map(({ description, id, urls: { small } }) => {
        return (
          <li key={id}>
            <ImageCard description={description} url={small} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
