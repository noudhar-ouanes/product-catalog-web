import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../constants/Types';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  description: 'This is a test product.',
  category: 'Test Category',
  price: 99.99,
  image: 'https://via.placeholder.com/150',
  favorite: false,
  rating:{
    rate:3,
    count:1
  }
} as Product;

describe('ProductCard', () => {
  test('renders product details correctly', () => {
    render(<ProductCard product={mockProduct} onFavoriteToggle={jest.fn()} />);

    expect(screen.getByRole('heading', { name: /test product/i })).toBeInTheDocument();
    expect(screen.getByText(/this is a test product/i)).toBeInTheDocument();
    expect(screen.getByText(/category: test category/i)).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  
  });

  test('shows correct favorite icon (not favorited)', () => {
    render(<ProductCard product={mockProduct} onFavoriteToggle={jest.fn()} />);
    expect(screen.getByRole('button')).toHaveTextContent('🤍');
  });

  test('shows correct favorite icon (favorited)', () => {
    render(
      <ProductCard
        product={{ ...mockProduct, favorite: true }}
        onFavoriteToggle={jest.fn()}
      />
    );
    expect(screen.getByRole('button')).toHaveTextContent('❤️');
  });

  test('calls onFavoriteToggle when favorite button is clicked', () => {
    const toggleMock = jest.fn();
    render(<ProductCard product={mockProduct} onFavoriteToggle={toggleMock} />);

    fireEvent.click(screen.getByRole('button'));
    expect(toggleMock).toHaveBeenCalledWith(mockProduct.id);
  });
});
