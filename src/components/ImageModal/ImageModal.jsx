import React from "react";
import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";

const ImageModal = ({ photo, closeModal }) => {
  return (
    <ReactModal isOpen={true} onRequestClose={closeModal} style={customStyles}>
      <img src={photo.urls.regular} alt={photo.alt_description} />
    </ReactModal>
  );
};

export default ImageModal;
