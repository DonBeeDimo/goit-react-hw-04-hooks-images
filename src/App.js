import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './components/Container';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

export default function App() {
  const [imageName, setImageName] = useState('');

  return (
    <Container>
      <Searchbar onSearch={setImageName} />
      <ImageGallery imageName={imageName} />
      <ToastContainer autoClose={3000} theme="colored" />
    </Container>
  );
}
