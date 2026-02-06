export const SortFilterBar = ({ sortBy, setSortBy, order, setOrder, minLikes, setMinLikes }) => {
  return (
    <div className="flex flex-col gap-6 mb-6 mt-6">

      {/* TOP ROW: SORT + ORDER */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">

        {/* SORT */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="sort-by"
            className="text-sm font-medium text-gray-700"
          >
            Sort by
          </label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
            h-10 min-w-40
            rounded-md border border-gray-300 bg-white px-3 text-sm
            transition
            hover:border-gray-400
            focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300
          "
          >
            <option value="">Select</option>
            <option value="date">Date</option>
            <option value="likes">Likes</option>
          </select>
        </div>

        {/* ORDER */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="order"
            className="text-sm font-medium text-gray-700"
          >
            Order
          </label>
          <select
            id="order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="
            h-10 min-w-40
            rounded-md border border-gray-300 bg-white px-3 text-sm
            transition
            hover:border-gray-400
            focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300
          "
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

      </div>

      {/* BOTTOM ROW: MIN LIKES */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="font-medium">Minimum likes</span>
          <span className="font-semibold text-gray-900">{minLikes}</span>
        </div>

        <input
          id="min-likes"
          type="range"
          min="0"
          max="20"
          value={minLikes}
          onChange={(e) => setMinLikes(Number(e.target.value))}
          className="
          w-1/2 accent-happy
          transition
        "
        />
      </div>

    </div>
  );
};


