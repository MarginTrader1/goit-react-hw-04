import Modal from "react-modal";

// import css from "./ImageModal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ImageModal = ({ modalIsOpen, closeModal, photo }) => {
  return (
    <div>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div>
          <img src={`${photo}`} alt={`modal photo`} />
        </div>
      </Modal>
    </div>
  );
};

export default ImageModal;
