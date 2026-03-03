import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/organisms';
import { ProductListingPage, ProductDetailPage } from './pages';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/details/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
