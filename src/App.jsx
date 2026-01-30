import { useState, useEffect } from "react";
import { Navbar } from "./Components/Navbar";
import { ThoughtForm } from "./Components/ThoughtForm";
import { ThoughtList } from "./Components/ThoughtList";
import { SkeletonLoader } from "./Components/SkeletonLoader";
import { SortFilterBar } from "./Components/SortFilterBar";

const API_URL = "https://js-project-api-uhzm.onrender.com/thoughts";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThoughtId, setNewThoughtId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("desc");
  const [minLikes, setMinLikes] = useState(0);

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

      const params = new URLSearchParams();

      if (sortBy) {
        params.append("sort", sortBy);
      }

      if (order) {
        params.append("order", order);
      }

      if (minLikes) {
        params.append("hearts", minLikes);
      }

      const query = params.toString();
      const url = query
        ? `${API_URL}?${query}`
        : API_URL;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        setThoughts(data.response);
      } catch (error) {
        setError("Couldn't fetch thoughts. Try again later");
      } finally {
        setLoading(false);
      }
    };

    fetchThoughts();
  }, [sortBy, order, minLikes]);


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

      const data = await res.json();

      setError(null);

      // Add the new thought from API
      setThoughts((prev) => [data.response, ...prev]);

      //Mark this thought as new so it can animate in ThoughtCard
      setNewThoughtId(data.response._id);

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this thought?")) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }
      // Update state after successful deletion
      setThoughts((prev) => prev.filter((thought) => thought._id !== id));
    } catch (error) {
      setError("Could not delete thought");
    }
  };

  const handleUpdate = async (id, updatedMessage) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: updatedMessage }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      // Update the thought in the list
      setThoughts((prev) =>
        prev.map((thought) =>
          thought._id === id ? data.response : thought
        )
      );
    } catch (error) {
      setError("Could not update thought");
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

          <SortFilterBar
            sortBy={sortBy}
            setSortBy={setSortBy}
            order={order}
            setOrder={setOrder}
            minLikes={minLikes}
            setMinLikes={setMinLikes}
          />

          {error && (
            <div className="text-center text-red-600 mt-8">
              {error}
            </div>
          )}

          <div className="mt-8">
            {loading ? (
              <SkeletonLoader />
            ) : thoughts.length === 0 ? (
              <p className="text-center text-gray-500 mt-8">
                No thoughts match your filter.
              </p>
            ) : (
              <ThoughtList
                thoughts={thoughts}
                onLike={handleLike}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                newThoughtId={newThoughtId}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};
