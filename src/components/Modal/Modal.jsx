import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalBackdrop, ModalWindow } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    };

    handleKeyDown = e => {
        if (e.code === 'Escape') {
        this.props.onClick();
        }
    };

    handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
        this.props.onClick();
        }
    };

    render() {
        const { src, alt } = this.props;
        return createPortal(
            <ModalBackdrop onClick={this.handleBackdropClick}>
                <ModalWindow>
                    <img src={src} alt={alt}/>
                </ModalWindow>
            </ModalBackdrop>,
            modalRoot,
        );
  }
}


