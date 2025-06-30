import { useEffect, useMemo, useState } from 'react';
import { Product, ProductList } from '../constants/Types';
import { PAGE_SIZE, sortOptions } from '../constants/Constants';
import { ProductCard } from '../components/ProductCard';
import './ProductCatalogPage.css';


export default function ProductCatalogPage() {
  const [products, setProducts] = useState<ProductList>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);
  const [sortOption, setSortOption] = useState('Default');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data: Product[] = await res.json();

        const saved = localStorage.getItem('favoriteProductIds');
        const favoriteIds: number[] = saved ? JSON.parse(saved) : [];

        const updated = data.map((p) => ({
          ...p,
          favorite: favoriteIds.includes(p.id),
        }));

        setProducts(updated);
        const uniqueCategories = Array.from(new Set(data.map((p) => p.category)));
        setCategories(['All', ...uniqueCategories]);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (id: number) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, favorite: !p.favorite } : p
    );
    setProducts(updated);

    const favs = updated.filter((p) => p.favorite).map((p) => p.id);
    localStorage.setItem('favoriteProductIds', JSON.stringify(favs));
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortOption === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    }
    if (sortOption === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [products, searchQuery, activeCategory, sortOption]);

  // pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setCurrentPage(1); 
  }, [searchQuery, activeCategory, sortOption]);

  return (
    <div className="catalog-container">
      <h1>Product Catalog</h1>

      <input
        className="search-input"
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="filters">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`filter-button ${activeCategory === c ? 'active' : ''}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="sorts">
        {sortOptions.map((option) => (
          <button
            key={option}
            onClick={() => setSortOption(option)}
            className={`sort-button ${sortOption === option ? 'active' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>

      {loading && <p className="loading">Loading products...</p>}
      {error && <p className="error">{error}</p>}

      <div className="product-list">
        {!loading && !error && filtered.length === 0 && (
          <p>No products match your search.</p>
        )}
        {paginatedProducts.map((p) => (
          <ProductCard key={p.id} product={p} onFavoriteToggle={toggleFavorite} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={currentPage === num ? 'active-page' : ''}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
