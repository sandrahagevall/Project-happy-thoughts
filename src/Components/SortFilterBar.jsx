export const SortFilterBar = ({ sortBy, setSortBy, order, setOrder, minLikes, setMinLikes }) => {
  return (
    <div className="flex flex-col gap-4 mb-6 mt-6">

      {/* TOP ROW: SORT + ORDER */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-2">

        {/* SORT */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-by" className="font-medium">
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            id="sort-by"
            className="
              border border-gray-400 
              rounded-xs p-1 focus:outline-none 
              focus:ring-2 focus:ring-red-200 
              focus:border-red-200
            "
          >
            <option value="">-- Select --</option>
            <option value="date">Date</option>
            <option value="likes">Likes</option>
          </select>
        </div>

        {/* ORDER */}
        <div className="flex items-center gap-2">
          <label htmlFor="order" className="font-medium">
            Order:
          </label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            id="order"
            className="
              border border-gray-400 
              rounded-xs p-1 focus:outline-none 
              focus:ring-2 focus:ring-red-200 
              focus:border-red-200
            "
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* BOTTOM ROW: MIN LIKES */}
      <div className="flex flex-col items-center gap-2">
        <label className="flex items-center gap-2 font-medium">
          Minimum likes: <strong>{minLikes}</strong>
        </label>
        <input
          type="range"
          min="0"
          max="20"
          value={minLikes}
          id="min-likes"
          onChange={(e) => setMinLikes(Number(e.target.value))}
          className="accent-happy w-1/2"
        />
      </div>
    </div>
  );
};


