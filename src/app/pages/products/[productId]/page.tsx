// @ts-nocheck
// @react/client

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductDetail from "../../../components/ProductDetail";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

interface pageProps {
  params: { productId: int };
}

const ProductDetailPage: React.FC<pageProps> = ({ params }) => {
  const { productId } = params;
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    if (productId) {
      // Fetch the product data based on the productId from an API or some data source
      // Replace this with your actual API endpoint or data retrieval logic
      fetch(`/api/products/${productId}`)
        .then((response) => response.json())
        .then((response) => {
          // Update the product state with the retrieved data
          setProduct(response.data.product);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }
  }, [productId]);

  return (
    <div>
      <h1>Product Detail Page</h1>
      {product ? (
        <ProductDetail product={product} key={product.id} />
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
