import { ThoughtCard } from "./ThoughtCard";

export const ThoughtList = ({ thoughts, onLike, onDelete, onUpdate, newThoughtId }) => {
  return (
    <div className="space-y-6">
      {thoughts.map((thought) => (
        <ThoughtCard
          key={thought._id}
          thought={thought}
          onLike={onLike}
          onDelete={onDelete}
          onUpdate={onUpdate}
          isNew={thought._id === newThoughtId} />
      ))}
    </div>
  );
};
