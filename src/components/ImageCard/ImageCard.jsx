import css from "./ImageCard.module.css";

const ImageCard = ({ description, url }) => {
  return (
    <div className={css.card}>
      <img className={css.photo} src={`${url}`} alt={`${description}`} />
    </div>
  );
};

export default ImageCard;
