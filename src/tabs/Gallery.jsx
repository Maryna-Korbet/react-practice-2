import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { SearchForm, ImagesGallery, LoadMoreBtn, NoImages, Loader, ErrorText } from 'components';


export class Gallery extends Component {
  
  state={
    searchText: '',
    page: 1,
    photos: [],
    showBtn: false,
    isEmpty: false,
    isLoader: false,
    isError: '',
    isOnline: navigator.onLine, 
  }

  componentDidMount() {
    window.addEventListener('online', this.handleNetworkChange);
    window.addEventListener('offline', this.handleNetworkChange);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleNetworkChange);
    window.removeEventListener('offline', this.handleNetworkChange);
  }

  componentDidUpdate(_, prevState) {
    const { searchText, page } = this.state;

    if (searchText !== prevState.searchText || page !== prevState.page) {
      this.setState({isLoader: true, isError: ''});

      ImageService.getImages(searchText, page)
        .then(({ photos, total_results }) => {
          if (!photos.length) {
            this.setState({ isEmpty: true });
            return;
          }
          
          this.setState(prevState => ({
            photos: [...prevState.photos, ...photos],
            showBtn : page < Math.ceil(total_results / 15)
          }))
        })
        .catch(error => {
          this.setState({ isError: 'There was a problem: ' + error.message });
        })
        .finally(()=> this.setState({isLoader: false}));
    }    
  }
  
  handleSubmit = (searchText) => {
    this.setState({
      searchText,
      page: 1,
      photos: [],
      showBtn: false,
      isEmpty: false,
      isError: '',
    });
  }

  handleLoadMore=()=> {
    this.setState((prevState)=> ({page: prevState.page + 1})); 
  } 

  handleNetworkChange = () => {
    this.setState({ isOnline: navigator.onLine });
  }

  render() {
    const { photos, showBtn, isEmpty, isLoader, isError, isOnline } = this.state;

    return (
      <>
        <SearchForm handleSubmit={this.handleSubmit} />

        {!isOnline && <ErrorText type="network">{isError}</ErrorText>}

        {isOnline && isError && <ErrorText type="server">{isError}</ErrorText>}

        {photos.length > 0 && <ImagesGallery photos={photos} />}
        
        {showBtn && <LoadMoreBtn onClick={this.handleLoadMore} />}
        
        {isEmpty && <NoImages />}

        {isLoader && <Loader />}
      </>
    );
  }
}
