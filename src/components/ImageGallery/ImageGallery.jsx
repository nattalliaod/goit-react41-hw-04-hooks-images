import PropTypes from 'prop-types';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem'
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ gallery, onClick }) => {
    return <GalleryList>
        {gallery.map(({webformatURL, largeImageURL, tags},idx) => (
            <ImageGalleryItem key={idx} src={webformatURL} url={largeImageURL} alt={tags} onClick={onClick}/>
        ))}
    </GalleryList>
}

ImageGallery.propTypes = {
    gallery: PropTypes.arrayOf(
        PropTypes.shape({
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string,
        }),
    ),
    onClick: PropTypes.func.isRequired,
};
