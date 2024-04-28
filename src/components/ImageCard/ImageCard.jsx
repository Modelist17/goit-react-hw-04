import React from "react";
import styles from "./ImageCard.module.css";

const ImageCard = ({ photo, openModal }) => {
  return (
    <li>
      <div>
        <img
          className={styles.ImageCard} 
          width={350}
          src={photo.urls.small}
          alt={photo.alt_description}
          onClick={() => {
            openModal(photo);
          }}
        />
      </div>
    </li>
  );
};

export default ImageCard;
