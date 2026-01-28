import { ThoughtCard } from "./ThoughtCard";

export const ThoughtList = ({ thoughts, onLike, newThoughtId, onDelete }) => {
  return (
    <div className="space-y-6">
      {thoughts.map((thought) => (
        <ThoughtCard
          key={thought._id}
          thought={thought}
          onLike={onLike}
          onDelete={onDelete}
          isNew={thought._id === newThoughtId} />
      ))}
    </div>
  );
};
