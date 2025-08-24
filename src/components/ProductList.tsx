import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

// Definición de la interfaz para la estructura de un producto de la API
interface Product {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  sold_quantity: number;
  permalink: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // URL de la API de Mercado Libre para productos de impresión 3D, ordenados por cantidad vendida
        const response = await fetch(
          'https://api.mercadolibre.com/sites/MLA/search?q=impresion%203d&sort=sold_quantity_desc'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Filtramos solo los campos que necesitamos y los mapeamos a nuestra interfaz Product
        const fetchedProducts: Product[] = data.results.map((item: any) => ({
          id: item.id,
          title: item.title,
          thumbnail: item.thumbnail,
          price: item.price,
          sold_quantity: item.sold_quantity || 0, // Algunos productos pueden no tener cantidad vendida
          permalink: item.permalink,
        }));
        setProducts(fetchedProducts);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

  if (loading) {
    return <div className="text-center text-white text-xl mt-8">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl mt-8">Error al cargar los productos: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {products.length === 0 ? (
        <div className="text-center text-gray-400 text-xl mt-8">No se encontraron productos de impresión 3D.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
