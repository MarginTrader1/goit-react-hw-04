import Modal from "react-modal";

import css from "./ImageModal.module.css";

const ImageModal = ({ modalIsOpen, closeModal, photo }) => {
  return (
    <div>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={css.modal}
        overlayClassName={css.overlay}
      >
        <div className={css.card}>
          <img className={css.photo} src={`${photo}`} alt={`modal photo`} />
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
