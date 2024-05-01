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
    setCurrentPage(1);
    try {
      const photos = await searchImages(searchTerm, 1);
      setPhotos(photos);
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
        const response = await searchImages(searchValue, currentPage);
        if (currentPage === 1) {
          setPhotos(response.data.results);
        } else {
          setPhotos((prevPhotos) => [...prevPhotos, ...response.data.results]);
        }
        setIsLoading(false);
        setError(null); //
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
