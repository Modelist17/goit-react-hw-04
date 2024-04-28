import styles from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

const SearchBar = ({
  onSubmit,
  searchValue,
  handleSearchChange,
  handleClick,
}) => {
  const notify = () => toast("Enter your request");

  return (
    <header>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <button
            className={styles.btn}
            type="submit"
            onClick={() => {
              if (!searchValue) {
                notify();
              } else {
                handleClick();
              }
            }}
          >
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
