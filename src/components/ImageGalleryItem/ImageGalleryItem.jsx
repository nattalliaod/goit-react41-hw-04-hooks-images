import PropTypes from 'prop-types';
import { ItemGallery, ImgItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ onClick, src, alt, url }) => {
    return <ItemGallery>
        <ImgItem onClick={onClick} src={src} data-src={url} alt={alt}/>
    </ItemGallery>
}

ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};