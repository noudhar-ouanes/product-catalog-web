import React from 'react';
import './ProductCard.css';
import { Product } from '../constants/Types';

type Props = {
  product: Product;
  onFavoriteToggle: (id: number) => void;
};

export const ProductCard: React.FC<Props> = ({ product, onFavoriteToggle }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="image" />
      <div className="details">
        <h3>{product.title}</h3>
        <p className="desc">{product.description}</p>
        <p className="category">Category: {product.category}</p>
        <strong>${product.price}</strong>
      </div>
      <button
        className={`favorite-btn ${product.favorite ? 'favorited' : ''}`}
        onClick={() => onFavoriteToggle(product.id)}
      >
        {product.favorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

