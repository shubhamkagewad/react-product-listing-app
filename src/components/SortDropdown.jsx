function SortDropdown({ sortOrder, setSortOrder }) {
  return (
    <div className="sort-container">
      <label htmlFor="sort">Sort by price:</label>

      <select
        id="sort"
        value={sortOrder}
        onChange={(event) => setSortOrder(event.target.value)}
      >
        <option value="">Default</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
      </select>
    </div>
  );
}

export default SortDropdown;