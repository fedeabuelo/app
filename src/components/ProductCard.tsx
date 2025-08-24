import React from 'react';

// Definición de la interfaz para las propiedades del producto
interface ProductProps {
  product: {
    id: string;
    title: string;
    thumbnail: string;
    price: number;
    sold_quantity: number;
    permalink: string;
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <a
      href={product.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
          {product.title}
        </h2>
        <p className="text-green-400 text-2xl font-bold mb-1">
          ${product.price.toLocaleString('es-AR')}
        </p>
        <p className="text-gray-400 text-sm mb-3">
          Vendidos: {product.sold_quantity}
        </p>
        <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          Ver Producto
        </span>
      </div>
    </a>
  );
};

export default ProductCard;
