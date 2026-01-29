import { useEffect, useState } from "react";
import { HeartButton } from "./HeartButton";
import { TimeAgo } from "./TimeAgo";


export const ThoughtCard = ({ thought, onLike, onDelete, onUpdate, isNew }) => {
  const [animate, setAnimate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(thought.message);

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
        relative group
       ${isNew ? "opacity-0" : ""}
       ${animate ? "animate-fadeInUp" : ""}
       bg-white border border-black rounded-xs p-6 
       shadow-[8px_8px_0_0_#000]
       hover:-translate-y-1 hover:-translate-x-1
       transition-transform duration-200 
       `}
    >

      {/* MESSAGE */}
      {isEditing ? (
        <textarea
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)}
          className="
            w-full border border-black rounded-xs p-2
            text-black text-lg font-medium leading-relaxed
            focus:outline-none focus:ring-2 focus:ring-red-200 
          focus:border-red-200
            mb-4 mt-4 resize-none
          "
          rows={2}
          autoFocus
        />
      ) : (
        <p
          className="
          text-black text-lg mb-4 font-medium leading-relaxed
          wrap-break-word
        "
        >
          {thought.message}
        </p>
      )}

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

      {isEditing && (
        <div className="flex justify-end gap-3 mt-3">
          <button
            onClick={() => {
              onUpdate(thought._id, editedMessage);
              setIsEditing(false);
            }}
            className="text-sm text-pink-600 hover:underline cursor-pointer"
          >
            Save
          </button>

          <button
            onClick={() => {
              setEditedMessage(thought.message);
              setIsEditing(false);
            }}
            className="text-sm text-gray-500 hover:underline cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}

      {/* EDIT & DELETE BUTTON */}
      <div className="absolute top-2 right-2 mr-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(true)}
          title="Edit thought"
          className="p-1 text-pink-400 hover:text-pink-400 transition cursor-pointer">
          ✏️
        </button>

        <button onClick={() => onDelete(thought._id)}
          title="Delete thought"
          className="p-1 text-black hover:text-red-600 transition cursor-pointer">
          ✕
        </button>
      </div>
    </div>
  );
};
