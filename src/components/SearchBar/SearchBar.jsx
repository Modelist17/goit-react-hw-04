import React from "react";
import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";

const SearchBar = ({ searchValue, handleSearchChange, handleSubmit }) => {
  const notify = () => toast.error("Enter your request");

  return (
    <header>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <button className={styles.btn} type="submit">
            &#x1F50D;
          </button>
          <input
            className={styles.inputField}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
