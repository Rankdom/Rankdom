import React from 'react';
import { Link } from 'react-router-dom';


interface Category {
  name: string;
  href: string;
  icon: string;
}

interface CategoryGridProps {
  title: string;
  categories: Category[];
  onCategoryClick?: (categoryName: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ title, categories, onCategoryClick }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.href}
            className="category-button"
            onClick={(e) => {
              if (onCategoryClick) {
                e.preventDefault();
                onCategoryClick(category.name);
              }
            }}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
