import React, { useState, useEffect } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/';
import ImageError from '../ImageError';
import Loader from '../Loader';
import pixabayAPI from '../../services/Pixabay-api';
import Modal from '../Modal';
import Button from '../Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery({ imageName }) {
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImgProps, setModalImgProps] = useState({ url: '', alt: '' });
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!imageName) {
      return;
    }
    reset();
    setStatus(Status.PENDING);
    fetchQuery(imageName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageName]);

  const fetchQuery = imageName => {
    pixabayAPI
      .fetchImage(imageName, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          return Promise.reject(
            new Error(`Изображение с именем - ${imageName} - отсутствует`),
          );
        }

        setImages(images => [...images, ...hits]);
        setPage(page => page + 1);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  };

  const scrollDown = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 1000);
  };

  const handleLoadBtnClick = () => {
    fetchQuery(imageName);
    scrollDown();
  };

  const reset = () => {
    setPage(1);
    setImages([]);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const handleImgClick = props => {
    setModalImgProps(modalImgProps => props);
    toggleModal();
  };

  if (status === Status.IDLE) {
    return <div>Введите название изображения</div>;
  }

  if (status === Status.PENDING) {
    return <Loader />;
  }

  if (status === Status.REJECTED) {
    return <ImageError message={error.message} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <div>
        {showModal && (
          <Modal onClose={toggleModal}>
            <img
              src={modalImgProps.url}
              alt={modalImgProps.alt}
              className={s.modalImage}
            />
          </Modal>
        )}
        <ul className={s.ImageGallery}>
          {images.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              src={webformatURL}
              url={largeImageURL}
              alt={tags}
              openModal={handleImgClick}
            />
          ))}
        </ul>
        <Button handleLoadMore={handleLoadBtnClick} />
      </div>
    );
  }
}
