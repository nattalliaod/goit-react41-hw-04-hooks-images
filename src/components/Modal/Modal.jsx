import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalBackdrop, ModalWindow } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({alt, src, onClick}) => {

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

        return createPortal(
            <ModalBackdrop onClick={handleBackdropClick}>
                <ModalWindow>
                    <img src={src} alt={alt}/>
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
