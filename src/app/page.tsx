// @ts-nocheck
// @react/client
"use client";
import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import axios from "axios";
import Navbar from "./components/Navbar";
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Product Listing Page</h1>
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
