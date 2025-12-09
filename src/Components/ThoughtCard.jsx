import { useEffect, useState } from "react";
import dayjs from "dayjs";


export const ThoughtCard = ({ thought, onLike, isNew }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isNew) {
      const timeout = setTimeout(() => setAnimate(true), 0);
      return () => clearTimeout(timeout);
    } else {
      setAnimate(true);
    }
  }, [isNew]);


  const getTimeAgo = (createdAt) => {
    const now = dayjs();
    const date = dayjs(createdAt);

    const diffInSeconds = now.diff(date, "second");

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }

    const diffInMinutes = now.diff(date, "minute");
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }

    const diffInHours = now.diff(date, "hour");
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    const diffInDays = now.diff(date, "day");
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };


  return (
    <div
      className={`
       ${isNew ? "opacity-0" : ""}
       ${animate ? "animate-fadeInUp" : ""}
       bg-white border border-black rounded-xs p-6 
       shadow-[8px_8px_0_0_#000]
       hover:-translate-y-1 hover:-translate-x-1
       transition-transform duration-200
       `}
    >

      {/* MESSAGE */}
      <p className="text-black text-md mb-4 font-medium break-words leading-relaxed">
        {thought.message}
      </p>

      {/* LIKE + COUNTER + TIME */}
      <div className="flex items-center justify-between">

        {/* LIKE SECTION */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onLike(thought.id)}
            aria-label={`Like this thought. It currently has ${thought.hearts} likes`}
            className={`
              ${thought.hearts > 0
                ? "bg-red-300"
                : "bg-gray-200 hover:bg-red-300"} 
                w-12 h-12 rounded-full transition-colors shadow-sm cursor-pointer`}
          >
            ❤️
          </button>

          <span className="text-gray-500 text-sm">
            x {thought.hearts}
          </span>
        </div>

        {/* TIME */}
        <p className="text-xs text-gray-400">
          {getTimeAgo(thought.createdAt)}
        </p>

      </div>
    </div>
  );
};
