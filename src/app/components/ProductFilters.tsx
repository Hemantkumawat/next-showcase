import React from 'react';

interface Category {
  id: number;
  name: string;
}

interface ProductFiltersProps {
  categories: Category[];
  selectedCategories: number[];
  onCategoryChange: (categoryId: number) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <div className="filters-panel">
      <h2>Filters</h2>
      <div className="category-filters">
        <h3>Categories:</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => onCategoryChange(category.id)}
                />
                <span className="text-sm">{category.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductFilters;
