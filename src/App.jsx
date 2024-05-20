import React, { useState, useEffect } from "react";
import Loader from "./components/Loader/Loader";
import searchImages from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import "./App.css";

function App() {
  const [error, setError] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleSubmit = async (searchTerm) => {
    if (!searchTerm) {
      setError("Please enter a search query.");
      return;
    }
    setSearchValue(searchTerm);
    setCurrentPage(1);
    setPhotos([]);

    setIsLoading(true);
    try {
      const images = await searchImages(searchTerm, 1);
      setPhotos(images.results);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError("Error fetching images. Please try again later.");
      setIsLoading(false);
      console.error("Error fetching images:", error);
    }
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const images = await searchImages(searchValue, currentPage);
        setPhotos((prevPhotos) =>
          currentPage === 1
            ? images.results
            : [...prevPhotos, ...images.results]
        );
        setIsLoading(false);
        setError(null);
      } catch (error) {
        setError("Error fetching images. Please try again later.");
        setIsLoading(false);
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [searchValue, currentPage]);

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery photos={photos} openModal={openModal} />
      {photos.length > 0 && <LoadMoreBtn onNextPage={onNextPage} />}
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedImage={selectedPhoto && selectedPhoto.urls.regular}
      />
    </div>
  );
}

export default App;
