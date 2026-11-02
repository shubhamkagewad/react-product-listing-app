import { useState, useEffect } from 'react';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import CategoryFilter from './components/CategoryFilter';
import SortDropdown from './components/SortDropdown';
import Pagination from './components/Pagination';

import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const[error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;
  const prices = [800, 200, 500, 100];
  prices.sort((a, b) => a - b);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === '' ||
      product.category === selectedCategory;
      return matchesSearch && matchesCategory;
  });
  const categories = [
    ...new Set(products.map((product) => product.category))
  ];
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'low-high') {
      return a.price - b.price;
    }
    if (sortOrder === 'high-low') {
      return b.price - a.price;
    }
    return 0;
  });
  const totalPages = Math.ceil(
    sortedProducts.length / productsPerPage
  );
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=12')
      .then((response)=>{
        if(!response.ok){
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data)=>{
        setProducts(data.products);
      })
      .catch((err)=>{
        setError(err.message);
      })
      .finally(()=>{
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, sortOrder]);

  return (
    <div>
      <Header />
      <div className="filter-section">
        <SearchBar
          search={search}
          setSearch={setSearch}
        />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <SortDropdown
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>
      <h2>Total Products: {products.length}</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : sortedProducts.length === 0 ? (
        <p className="empty-state">
          No products found. Try another search or category.
        </p>
      ) : (
        <ProductList products={currentProducts} />
      )}
      <p className="product-count">
        Showing {sortedProducts.length} products
      </p>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;