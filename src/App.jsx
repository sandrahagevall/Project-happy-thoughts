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

  // Get liked thoughts from local storage
  const [likedThoughts, setLikedThoughts] = useState(() => {
    const stored = localStorage.getItem("likedThoughts");
    return stored ? JSON.parse(stored) : [];
  });


  /*--- Fetch Thoughts from API ---*/

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


  // Sync liked thoughts to local storage whenever likedThoughts changes
  useEffect(() => {
    localStorage.setItem("likedThoughts", JSON.stringify(likedThoughts))
  }, [likedThoughts]);


  /*--- POST new thought to API ---*/

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

      //Mark this thought as new so it can animate in ThoughtCard
      setNewThoughtId(newThought._id);

      // Reset newThoughtId after animation is finished
      setTimeout(() => {
        setNewThoughtId(null);
      }, 450);

    } catch (error) {
      setError("Could not create thought. Try again later.");
    }
  };


  /*--- POST like to API ---*/

  const handleLike = async (id) => {
    // Optimistic update - update likes right away, no need to wait for API, user get feedback immediately
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
        headers: { "Content-Type": "application/json", }
      });

      if (!res.ok) throw new Error("Failed to like thought");

      // Add thought ID to likedThoughts if not already included
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
          <h1 className="text-center pb-8 text-2xl lg:text-3xl soft-glow">
            Welcome to Happy Thoughts
          </h1>

          <ThoughtForm onSubmit={addThought} />

          {error && (
            <div className="text-center text-red-600 mb-4 mt-5">
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
  );
};
