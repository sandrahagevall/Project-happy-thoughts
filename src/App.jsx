import { useState, useEffect } from "react";
import { Navbar } from "./Components/Navbar";
import { ThoughtForm } from "./Components/ThoughtForm";
import { ThoughtList } from "./Components/ThoughtList";
import { SkeletonLoader } from "./Components/SkeletonLoader";

const API_URL = "https://happy-thoughts-api-4ful.onrender.com/thoughts";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThoughtId, setNewThoughtId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [likedThoughts, setLikedThoughts] = useState(() => {
    const stored = localStorage.getItem("likedThoughts");
    return stored ? JSON.parse(stored) : [];
  });


  useEffect(() => {
    const fetchThoughts = async () => {
      setLoading(true);
      setError(null);

      // Test for loadingspinner
      // await new Promise((resolve) => setTimeout(resolve, 1500));

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


  useEffect(() => {
    localStorage.setItem("likedThoughts", JSON.stringify(likedThoughts))
  }, [likedThoughts]);


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

    } catch (error) {
      setError("Could not create thought. Try again later.");
    }
  };


  const handleLike = async (id) => {
    // Optimistic update (save old values)
    const previousThoughts = thoughts;
    const newThoughts = thoughts.map((thought) =>
      thought._id === id
        ? { ...thought, hearts: thought.hearts + 1 }
        : thought
    );

    setThoughts(newThoughts);

    try {
      // Send like to API
      const res = await fetch(`${API_URL}/${id}/like`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to like thought");
      }

      // Add to LikedThoughts 
      setLikedThoughts((prev) =>
        prev.includes(id) ? prev : [...prev, id]);

    } catch (error) {
      // Rollback UI if API fails
      setThoughts(previousThoughts);
      setError("Could not like thought");
    }
  };


  return (
    <>
      <Navbar likedThoughts={likedThoughts} />
      <main>
        <div className="max-w-sm md:max-w-xl lg:max-w-3xl mx-auto p-4 md:p-8 lg:p-12">
          <h1 className="text-center pb-8 text-2xl lg:text-3xl pulse-glow">Welcome to Happy Thoughts</h1>
          <ThoughtForm onSubmit={addThought} />
          {error && (
            <div className="text-center text-red-600 mb-4">
              {error}
            </div>
          )}
          <div className="mt-8">
            {loading ? (
              <SkeletonLoader />
            ) : (
              <ThoughtList
                thoughts={thoughts}
                onLike={handleLike}
                newThoughtId={newThoughtId}
              />
            )}
          </div>
        </div>
      </main>
    </>
  )
}
