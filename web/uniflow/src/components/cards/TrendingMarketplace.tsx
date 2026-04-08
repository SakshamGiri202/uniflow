import React from 'react';
import '../../styles/cards.css';

interface Product {
  id: number;
  name: string;
  price: string;
  items?: number;
  image: string;
}

const TrendingMarketplace: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: 'Custom...',
      price: 'Custom Pricing',
      image: '⌨️',
    },
    {
      id: 2,
      name: 'Pro Designer...',
      price: '₹42,500',
      image: '🖥️',
    },
    {
      id: 3,
      name: 'Vintage Cinema Lens Kit',
      price: '₹85,000',
      items: 15,
      image: '📷',
    },
  ];

  return (
    <div className="card marketplace-card">
      <div className="card-header">
        <div>
          <h2>Trending in Marketplace</h2>
          <p className="card-subtitle">Curated tools for the modern builder.</p>
        </div>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <div className="product-image">{product.image}</div>
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
            {product.items && <span className="product-items">+{product.items} Items</span>}
            <button className="add-cart-btn">🛒</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMarketplace;
