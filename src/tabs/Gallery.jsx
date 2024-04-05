import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { SearchForm, ImagesGallery, LoadMoreBtn, NoImages } from 'components';


export class Gallery extends Component {
  
  state={
    searchText: '',
    page: 1,
    photos: [],
    showBtn: false,
    isEmpty: false,
  }

  componentDidUpdate(_, prevState) {
    const { searchText, page } = this.state;
    if (searchText !== prevState.searchText || page !==prevState.page) {
      ImageService.getImages(searchText, page).then(({photos, total_results}) => {
        
        if (!photos.length) {
          this.setState({ isEmpty: true });
          return;
        }
        
        this.setState(prevState => ({
          photos: [...prevState.photos, ...photos],
          showBtn : page < Math.ceil(total_results / 15)
        }))
      });
    }    
  }
  
  handleSubmit = (searchText) => {
    this.setState({
      searchText,
      page: 1,
      photos: [],
      showBtn: false,
      isEmpty: false,
    });
  }

  handleLoadMore=()=> {
    this.setState((prevState)=> ({page: prevState.page + 1})); 
  } 

  render() {
    const { photos, showBtn, isEmpty } = this.state;

    return (
      <>
        <SearchForm handleSubmit={this.handleSubmit} />

        {photos.length > 0 && <ImagesGallery photos={photos} />}
        
        {showBtn && <LoadMoreBtn onClick={this.handleLoadMore} />}
        
        {isEmpty && <NoImages />}
      </>
    );
  }
}
