import React from 'react';
import PropTypes from 'prop-types';
import errorImg from '../../image/error.png';
import s from './ImageError.module.css';

export default function ImageError({ message }) {
  return (
    <div className={s.error} role="alert">
      <p className={s.errorText}>{message}</p>{' '}
      <img src={errorImg} alt="empty" />
    </div>
  );
}

ImageError.propTypes = {
  message: PropTypes.string.isRequired,
};
