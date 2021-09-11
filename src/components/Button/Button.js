import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function LoadMoreButton({ handleLoadMore }) {
  return (
    <button type="button" className={s.Button} onClick={() => handleLoadMore()}>
      Load more
    </button>
  );
}

LoadMoreButton.protoTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
