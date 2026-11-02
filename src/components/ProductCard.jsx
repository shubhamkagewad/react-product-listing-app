function ProductCard({ product }) {
  return (
    <div className="product-card">

      <img
        src={product.thumbnail}
        alt={product.title}
      />

      <div className="product-info">

        <h3>{product.title}</h3>

        <p className="category">
          {product.category}
        </p>

        <h4>${product.price}</h4>

        <p>⭐ {product.rating}</p>

      </div>

    </div>
  );
}

export default ProductCard;