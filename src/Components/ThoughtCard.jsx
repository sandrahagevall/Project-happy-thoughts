import { useEffect, useState } from "react";
import { HeartButton } from "./HeartButton";
import { TimeAgo } from "./TimeAgo";


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
      <p
        className="
          text-black text-lg mb-4 font-medium leading-relaxed
          wrap-break-word
        "
      >
        {thought.message}
      </p>

      {/* LIKE + COUNTER + TIME */}
      <div className="flex items-center justify-between">

        {/* LIKE SECTION */}
        <div className="flex items-center gap-2">
          <HeartButton
            onClick={() => onLike(thought._id)}
            hearts={thought.hearts}
          />

          <span className="text-gray-500 text-sm font-sans">
            x {thought.hearts}
          </span>
        </div>

        {/* TIME */}
        <TimeAgo createdAt={thought.createdAt} />
      </div>
    </div>
  );
};
