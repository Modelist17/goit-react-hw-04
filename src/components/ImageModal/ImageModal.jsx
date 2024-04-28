import Modal from "react-modal";
import css from "./ImageModal.module.css";

const ImageModal = ({ isOpen, onRequestClose, selectedImage }) => {
  return (
    <Modal
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Selected Image"
    >
      <img src={selectedImage} alt="Selected" />
    </Modal>
  );
};

export default ImageModal;