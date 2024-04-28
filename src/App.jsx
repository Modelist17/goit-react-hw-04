import { useState } from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import ReactModal from "react-modal";

import Loader from "./components/Loader/Loader";
import searchImages from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageCard from "./components/ImageCard/ImageCard";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";

import "./App.css";

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

ReactModal.setAppElement("#root");

function App() {
  const [error, setError] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value.trim());
  };

  const handleClick = (inputValue) => {
    setPhotos([]);
    setCurrentPage(1);
    setSearchValue(query);
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    const onNextPage = async () => {
      setCurrentPage(currentPage + 1);
      setIsLoading(true);
      try {
        const response = await searchImages(searchValue, currentPage);
        setPhotos((prevPhotos) => [...prevPhotos, ...response.data.results]);
      } catch (error) {
        setError(error);
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    onNextPage();
  }, [searchValue, currentPage]);

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    const onSubmit = async (event) => {
      event.preventDefault();

      setIsLoading(true);
      try {
        response = await searchImages(searchValue, currentPage);
        if (currentPage === 1) {
          setPhotos(response.data.results);
        } else {
          setPhotos((prevPhotos) => [...prevPhotos, ...response.data.results]);
        }
      } catch (error) {
        setError(error);
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };
  }, [searchValue]);

  return (
    <div>
      <SearchBar
        handleClick={handleClick}
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        onSubmit={onSubmit}
      />
      <ImageGallery photos={photos} openModal={openModal} />
      {photos && photos.length > 0 && <LoadMoreBtn onNextPage={onNextPage} />}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {(!photos || (photos.length === 0 && searchValue)) && !isLoading && (
        <ErrorMessage />
      )}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {selectedPhoto && (
          <img
            src={selectedPhoto.urls.regular}
            alt={selectedPhoto.alt_description}
          />
        )}
      </ReactModal>
    </div>
  );
}

export default App;
