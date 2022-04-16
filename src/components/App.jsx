import { Component } from "react";
import { animateScroll as scroll } from 'react-scroll';
import { toast, ToastContainer } from 'react-toastify';
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Spinner } from "./Loader/Loader";
import * as Api from '../servisApi/pixabay-api';
import { Container, Text } from "./App.styled";

export class App extends Component {

  state = {
    query: '',
    page: 1,
    gallery: [],
    status: 'idle',
    showModal: false,
    isLoading: false,
    largeUrl: null,
    alt: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
  
   try {
      if (query !== prevState.query || page !==prevState.page) {
        await Api.fetchPixabay(query, page).then(({ hits }) => {
          this.setState(prevState => ({
            gallery: [...prevState.gallery, ...hits.map(({ webformatURL, tags, largeImageURL }) => ({
              webformatURL, tags, largeImageURL
            }))],
            status: 'resolved',
            isLoading: false,
          }));
          this.scrollToBottom();
      })
 }  
   } catch {
     toast.error('Enter other query', {
                theme: 'colored',
              });
    }
  };

  scrollToBottom = () => {
    scroll.scrollToBottom();
  };

   handleFormSubmit = query => {
    this.setState({ query, gallery: [], page: 1, status: 'pending'});
  };

  handleLoadMoreButton = () => {
    this.setState(prevState => ({isLoading: true, page: prevState.page + 1 }));
  };

  toggleModal = () =>  this.setState(({ showModal }) => ({
      showModal: !showModal,
  }));

  onImageClick = e => {
  
    if (e.target.nodeName !== 'IMG') {
      return;
    }

    this.setState({
      largeUrl: e.target.getAttribute('data-src'),
      alt: e.target.getAttribute('alt'),
    });

    this.toggleModal();
  };
  
  render() {
    const { gallery, status, showModal, isLoading, largeUrl, alt } = this.state;
  
    return (
      <>
     
        <Searchbar onSubmit={this.handleFormSubmit} />
        <Container>
          {status === 'idle' && <Text>Enter your query</Text>}
          {status === 'pending' && <Spinner />}
          {status === 'resolved' && (
            <>
              <ImageGallery gallery={gallery} onClick={this.onImageClick} />
              {isLoading && <Spinner />}
              {gallery.length >= 12 && !isLoading && <Button onClick={this.handleLoadMoreButton} />}
            </>
          )}
          {showModal && <Modal src={largeUrl} alt={alt} onClick={this.toggleModal} />}
          <ToastContainer autoClose={3000} />
        </Container>
      </>
    );
 }
 
};



