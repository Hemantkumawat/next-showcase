// @ts-nocheck
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import ProductFilters from "./ProductFilters";
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({}) => {
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term
  const [currentPage, setCurrentPage] = useState(1); // Add state for current page
  const [totalPages, setTotalPages] = useState(1); // Add state for total pages
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `/api/products?categoryIds=${selectedCategories.toString()}&sortBy=${sortBy}&sortOrder=${sortOrder}&term=${searchTerm}&page=${currentPage}&limit=${10}`
        );
        setProducts(response.data["products"]);
        setTotalPages(Math.ceil(response.data["results"] / limit));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`/api/categories`);
        setCategories(response.data["categories"]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchProducts();
    fetchCategories();
  }, [selectedCategories, sortBy, sortOrder, searchTerm, currentPage]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle category filter changes
  const handleCategoryChange = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  // Handle pagination click
  const handlePaginationClick = (page: number) => {
    setCurrentPage(page);
  };

  // if (!products || products.length === 0) {
  //   return <div>No products available</div>;
  // }

  return (
    <div>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-2 md:mb-0 md:w-1/2 flex justify-center">
          <input
            className="border rounded p-2 text-black w-full md:w-auto"
            type="text"
            placeholder="Search by term"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="md:w-1/2 flex justify-end">
          <label className="mr-2">Sort by:</label>
          <select
            className="border rounded p-2 text-black"
            value={`${sortBy}_${sortOrder}`} // Combine sortOption and sortOrder for value
            onChange={(e) => {
              const [selectedSortBy, selectedSortOrder] =
                e.target.value.split("_");
              setSortBy(selectedSortBy);
              setSortOrder(selectedSortOrder);
            }}
          >
            <option value="title_asc">Name (A to Z)</option>
            <option value="title_desc">Name (Z to A)</option>
            <option value="price_asc">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
          </select>
        </div>
      </div>
      <div className="product-list">
  <div className="flex">
    {/* Left panel (Filters) */}
    <div className="w-1/4 p-4">
      <ProductFilters
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />
    </div>

    {/* Right panel (Products) */}
    <div className="w-3/4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Display sorted products */}
        {products.map((product) => (

          <Link
            href={`/pages/products/${product.id}`} 
            key={product.id}
            as={`/pages/products/${product.id}`}
          >
            <div key={product.id} className="bg-white p-4 shadow-md">
            {/* <Image
        src={product.imageUrl}
        width={500}
        height={500}
        alt="Picture of the author"
      /> */}
              <h2 className="text-xl font-semibold mb-2 text-black">{product.title}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-green-600 text-lg font-semibold">
                Price: ${product.price}
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-2 hover:bg-blue-600">
                View Detail
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
</div>

      <div className="pagination">
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePaginationClick(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
    </div>
  );
};

export default ProductList;
