import React from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string,
  categoryId: number,
}

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-green-600 text-lg font-semibold">
          Price: ${product.price}
        </p>
      </div>
      <div className="mt-4 text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
