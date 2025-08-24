import React from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default App;
