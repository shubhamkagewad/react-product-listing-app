function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="category-container">
      <label htmlFor="category">Filter by category:</label>

      <select
        id="category"
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;