export const ThoughtCard = ({ thought }) => {

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
    <div className="bg-white border border-black rounded-xs p-6 shadow-[8px_8px_0px_0px_#000]">
      <p className="text-black text-md mb-3 font-medium">
        {thought.message}
      </p>
      <div className="flex justify-end">
        <p className="text-xs text-gray-400">
          {getTimeAgo(thought.createdAt)}
        </p>
      </div>
    </div>
  )
}
