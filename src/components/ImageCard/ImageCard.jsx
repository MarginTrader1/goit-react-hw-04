import css from "./ImageCard.module.css";

const ImageCard = ({ description, url, openModal, id }) => {
   return (
      <div className={css.card}>
         <img
            onClick={() => openModal(id)}
            className={css.photo}
            src={`${url}`}
            alt={`${description}`}
         />
      </div>
   );
};

export default ImageCard;
