import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Loader from "./components/Loader/Loader";
import searchImages from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
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
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value.trim());
  };

  const handleClick = () => {
    setCurrentPage(1);
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onNextPage = async () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await searchImages(searchValue, currentPage);
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
    fetchImages();
  }, [searchValue, currentPage]);

  return (
    <div>
      <SearchBar
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        handleClick={handleClick}
      />
      <ImageGallery photos={photos} openModal={openModal} />
      {photos.length > 0 && <LoadMoreBtn onNextPage={onNextPage} />}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
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
