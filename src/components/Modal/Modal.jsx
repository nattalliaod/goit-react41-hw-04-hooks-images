import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Spinner } from "../Loader/Loader";
import { ModalBackdrop, ModalWindow } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ alt, src, onClick }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    const handleKeyDown = e => {
        if (e.code === 'Escape') {
        onClick();
        }
    };

    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
        onClick();
        }
    };

    const onLoad = () => {
    setLoaded(true);
    };

        return createPortal(
            <ModalBackdrop onClick={handleBackdropClick}>
                <ModalWindow>
                    <img src={src} alt={alt} onLoad={onLoad} style={{ display: loaded ? "block" : "none" }} />
                    {!loaded && <Spinner />}
                </ModalWindow>
            </ModalBackdrop>,
            modalRoot,
        );
}

Modal.propTypes = {
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };
