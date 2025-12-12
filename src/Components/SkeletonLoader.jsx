export const SkeletonLoader = () => {
  const placeholders = Array.from({ length: 3 });


  return (
    <div
      className="mx-auto w-full max-w-md space-y-4"
      role="status"
      aria-label="Loading thoughts"
      aria-busy="true"
    >
      <p className="text-center text-gray-600 mb-2 animate-pulse">
        Happy thoughts incoming… 🌸
      </p>

      {placeholders.map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-lg bg-white p-4 shadow-sm border border-pink-200"
        >
          <div className="flex space-x-4">
            <div className="flex justify-between items-center pt-4">
              <div className="h-10 w-10 rounded-full bg-pink-100" />
            </div>

            <div className="flex-1 space-y-4 py-2">
              <div className="h-3 bg-pink-100 rounded w-3/4" />
              <div className="h-3 bg-pink-100 rounded w-5/6" />
              <div className="h-3 bg-pink-100 rounded w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
