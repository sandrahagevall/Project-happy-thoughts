import { useState, useEffect } from "react";
import { Navbar } from "./Components/Navbar";
import { ThoughtForm } from "./Components/ThoughtForm";
import { ThoughtList } from "./Components/ThoughtList";
import { SkeletonLoader } from "./Components/SkeletonLoader";
import { SortFilterBar } from "./Components/SortFilterBar";
import { LoginForm } from "./Components/LoginForm";
import { API_BASE_URL } from "./constants";

// const API_URL = "https://js-project-api-uhzm.onrender.com/thoughts";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [newThoughtId, setNewThoughtId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("desc");
  const [minLikes, setMinLikes] = useState(0);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [totalUserLikes, setTotalUserLikes] = useState(0);

  const showError = (message) => {
    setError(message);

    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  const fetchUserLikes = async () => {
    if (!user) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/users/${user.id}/thoughts`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      setTotalUserLikes(data.length);
    } catch {
      setError("Could not fetch thoughts for user");
    }
  };

  useEffect(() => {
    fetchUserLikes();
  }, [user]);

  /*--- Fetch Thoughts from API ---*/

  useEffect(() => {
    const fetchThoughts = async () => {

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
        ? `${API_BASE_URL}/thoughts?${query}`
        : `${API_BASE_URL}/thoughts`;

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

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /*--- POST new thought to API ---*/

  const handleThoughtAdded = (newThought) => {
    setThoughts((prev) => [newThought, ...prev]);
    setNewThoughtId(newThought._id);

    // Reset newThoughtId efter animation is finished
    setTimeout(() => {
      setNewThoughtId(null);
    }, 450);
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
      const body = user ? { userId: user.id } : {}; // Only pass body if user is logged in
      const response = await fetch(`${API_BASE_URL}/thoughts/${id}/like`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to like thought");

      await fetchUserLikes();
    } catch (error) {
      // Rollback UI if API fails
      setThoughts(previousThoughts);
      setError("Could not like thought");
    }
  };

  const handleDelete = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setError("You must be logged in to delete a thought")
      return;
    }

    if (!window.confirm("Are you sure you want to delete this thought?")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/thoughts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          showError("You can only delete your own thoughts");
        } else {
          showError(data.message || "Could not delete thought");
        }
        return;
      }
      // Update state after successful deletion
      setThoughts((prev) => prev.filter((thought) => thought._id !== id));
    } catch (error) {
      setError("Could not delete thought");
    }
  };

  const handleUpdate = async (id, updatedMessage) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setError("You must be logged in to update a thought")
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/thoughts/${id}`, {

        method: "PATCH",
        body: JSON.stringify({ message: updatedMessage }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          setError("You can only edit your own thoughts");
        } else {
          setError(data.message || "Could not update thought");
        }
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

  const handleLogin = (userData) => {
    setUser(userData);
    // Save user data to localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    setShowLogin(false)
  };

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }
  return (
    <>
      <Navbar
        user={user}
        likedThoughts={totalUserLikes}
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
      />

      {showLogin && (
        <LoginForm
          handleLogin={handleLogin}
          onClose={() => setShowLogin(false)}
        />
      )}

      <main>
        <div className="max-w-sm md:max-w-xl lg:max-w-3xl mx-auto p-4 md:p-8 lg:p-12">
          <h1 className="text-center pb-8 text-2xl lg:text-3xl soft-glow">
            Welcome to Happy Thoughts
          </h1>

          <ThoughtForm onThoughtAdded={handleThoughtAdded} />

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
