import { useEffect, useState } from "react";
import { animateScroll as scroll } from 'react-scroll';
import { toast, ToastContainer } from 'react-toastify';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Spinner } from "./Loader/Loader";
import * as Api from '../servisApi/pixabay-api';
import { Container, Text } from "./App.styled";

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [largeUrl, setLargeUrl] = useState(null);
  const [alt, setAlt] = useState(null);

  useEffect(() => {
    
    async function fetchImg() {
      if (!query) return;

      try {
        await Api.fetchPixabay(query, page).then(({ hits }) => {
          setIsLoading(false);
          setGallery(state => [...state, ...hits.map(({ webformatURL, tags, largeImageURL }) => ({
            webformatURL, tags, largeImageURL
          }))]);
          
          setStatus(Status.RESOLVED);
          scrollToBottom();
        })
      } catch {
        toast.error('Enter other query', {
          theme: 'colored',
        });
      }
    }
    
    fetchImg();
  }, [page, query]);

  const scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setGallery([]);
    setPage(1);
    setStatus(Status.PENDING);
  };

  const handleLoadMoreButton = () => {
    setIsLoading(true);
    setPage(state => state + 1);
  };

  const toggleModal = () =>  setShowModal(!showModal);

  const onImageClick = e => {
  
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    
    setLargeUrl(e.target.getAttribute('data-src'));
    setAlt(e.target.getAttribute('alt'));
    toggleModal();
  };
  
    return (
      <>
     
        <Searchbar onSubmit={handleFormSubmit} />
        <Container>
          {status === Status.IDLE && <Text>Enter your query</Text>}
          {status === Status.PENDING && <Spinner />}
          {status === Status.RESOLVED && (
            <>
              <ImageGallery gallery={gallery} onClick={onImageClick} />
              {isLoading && <Spinner />}
              {gallery.length >= 12 && !isLoading && <Button onClick={handleLoadMoreButton} />}
            </>
          )}
          {showModal && <Modal src={largeUrl} alt={alt} onClick={toggleModal} />}
          <ToastContainer autoClose={3000} />
        </Container>
      </>
    );
};



