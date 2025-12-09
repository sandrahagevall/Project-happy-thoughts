import { useState, useEffect } from "react";
import { ThoughtForm } from "./Components/ThoughtForm";
import { ThoughtList } from "./Components/ThoughtList";

const API_URL = "https://happy-thoughts-api-4ful.onrender.com/thoughts";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThoughtId, setNewThoughtId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  // useEffect(() => {
  //   fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts")
  //     .then(res => res.json())
  //     .then(data => setThoughts(data));
  // }, []);

  useEffect(() => {
    const fetchThoughts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        setThoughts(data);
      } catch (error) {
        setError("Couldn't fetch thoughts. Try again later");
      } finally {
        setLoading(false);
      }
    };

    fetchThoughts();

  }, []);

  const addThought = (newMessage) => {
    const newThought = {
      _id: Date.now(),
      message: newMessage,
      hearts: 0,
      createdAt: new Date().toISOString(),
    };
    setThoughts((prev) => [newThought, ...prev]);
    setNewThoughtId(newThought._id);
  };


  const handleLike = (id) => {
    setThoughts(prev =>
      prev.map((thought) =>
        thought._id === id ? { ...thought, hearts: (thought.hearts || 0) + 1 }
          : thought
      )
    )
  }


  return (
    <div className="max-w-sm md:max-w-md lg:max-w-xl mx-auto p-4 md:p-8 lg:p-12">
      <ThoughtForm onSubmit={addThought} />
      <div className="mt-8">
        <ThoughtList
          thoughts={thoughts}
          onLike={handleLike}
          newThoughtId={newThoughtId} />
      </div>
    </div>
  )
}
