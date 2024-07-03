import css from "./NoPhoto.module.css";

const NoPhoto = () => {
  return (
    <p className={css.nophoto}>
      There are no photos according to your term! Please try another term!
    </p>
  );
};

export default NoPhoto;
