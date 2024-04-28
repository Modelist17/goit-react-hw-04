import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ photos, openModal }) => {
  return (
    <div>
      <ul className={styles.imgList}>
        {photos.map((photo) => (
          <ImageCard key={photo.id} photo={photo} openModal={openModal} />
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
