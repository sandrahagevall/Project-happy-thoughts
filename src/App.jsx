import { use, useState } from "react";
import { ThoughtForm } from "./Components/ThoughtForm";
import { ThoughtList } from "./Components/ThoughtList";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThoughtId, setNewThoughtId] = useState(null);

  const addThought = (newMessage) => {
    const newThought = {
      id: Date.now(),
      message: newMessage,
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    setThoughts((prev) => [newThought, ...prev]);
    setNewThoughtId(newThought.id);
  };


  const handleLike = (id) => {
    setThoughts(prev =>
      prev.map((thought) =>
        thought.id === id ? { ...thought, likes: (thought.likes || 0) + 1 }
          : thought
      )
    )
  }

  return (
    <>
      <div className="max-w-sm md:max-w-md lg:max-w-xl mx-auto p-4 md:p-8 lg:p-12">
        <ThoughtForm onSubmit={addThought} />
        <div className="mt-8">
          <ThoughtList thoughts={thoughts} onLike={handleLike} newThoughtId={newThoughtId} />
        </div>
      </div>
    </>
  )
}
