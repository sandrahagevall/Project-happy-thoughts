import { useState, useEffect } from "react";
import { ThoughtForm } from "./Components/ThoughtForm";
import { ThoughtList } from "./Components/ThoughtList";
import { MyLikedThoughts } from "./Components/MyLikedThoughts";

const API_URL = "https://happy-thoughts-api-4ful.onrender.com/thoughts";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThoughtId, setNewThoughtId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [likedThoughtsId, setLikedThoughtsId] = useState(() => {
    const stored = localStorage.getItem("likedThoughtsId");
    return stored ? JSON.parse(stored) : [];
  });

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


  const addThought = async (newMessage) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Message must be 5-140 characters.");
        return;
      }

      const newThought = await res.json();

      // Add the new thought from API
      setThoughts((prev) => [newThought, ...prev]);

      setNewThoughtId(newThought._id);

    } catch (err) {
      setError("Could not create thought. Try again later.");
    }
  };


  const handleLike = async (id) => {
    setThoughts(prev =>
      prev.map((thought) =>
        thought._id === id ? { ...thought, hearts: (thought.hearts || 0) + 1 }
          : thought
      )
    );

    try {
      const res = await fetch(`${API_URL}/${id}/like`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to like thought");
      }
    } catch (error) {
      setError("Could not like thought");
    }
  };


  return (
    <div className="max-w-sm md:max-w-md lg:max-w-xl mx-auto p-4 md:p-8 lg:p-12">
      <h1 className="text-center pb-6 text-2xl pulse-glow">Welcome to Happy Thoughts</h1>
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
