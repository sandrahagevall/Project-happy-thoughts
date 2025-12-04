export const ThoughtCard = ({ thought, onLike, isNew }) => {

  const getTimeAgo = (createdAt) => {
    const now = new Date();
    const date = new Date(createdAt);

    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60)
      return `${diffInSeconds} seconds ago`;

    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes${Math.floor(diffInSeconds / 60) > 1 ? "s" : ""} ago`;

    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours${Math.floor(diffInSeconds / 3600) > 1 ? "s" : ""} ago`;

    return `${Math.floor(diffInSeconds / 86400)} day${Math.floor(diffInSeconds / 86400) > 1 ? "s" : ""} ago`;
  };


  return (
    <div
      className={`
      bg-white border border-black rounded-xs p-6 
      shadow-[8px_8px_0_0_#000]
      hover:-translate-y-1 hover:-translate-x-1
      transition-transform duration-200 transition-all
      ${isNew ? "animate-fade-in-up" : ""}
    `}
    >

      {/* MESSAGE */}
      <p className="text-black text-md mb-4 font-medium break-words leading-relaxed">
        {thought.message}
      </p>

      {/* LIKE + COUNTER + TIME */}
      <div className="flex items-center justify-between">

        {/* ❤️ LIKE SECTION */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onLike(thought.id)}
            aria-label={`Like this thought. It currently has ${thought.likes} likes`}
            className="bg-gray-200 hover:bg-pink-200 w-12 h-12 rounded-full transition-colors shadow-sm"
          >
            ❤️
          </button>

          <span className="text-gray-500 text-sm">
            x {thought.likes}
          </span>
        </div>

        {/* 🕒 TIME */}
        <p className="text-xs text-gray-400">
          {getTimeAgo(thought.createdAt)}
        </p>

      </div>
    </div>
  );
};
