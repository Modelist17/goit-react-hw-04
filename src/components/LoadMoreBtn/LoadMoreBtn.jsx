import React from "react";
import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onNextPage }) => {
  return (
    <div>
      <button className={styles.loadMore} onClick={onNextPage} type="button">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
