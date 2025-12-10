import { useState, useEffect } from "react";

export const MyLikedThoughts = ({ likedThoughtsId }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const storedLikes = localStorage.getItem("likedCount");
    if (storedLikes) {
      setCount(Number(storedLikes));
    }
  }, []);

  useEffect(() => {
    const newLike = likedThoughtsId.length;
    setCount(newLike);
    localStorage.setItem("likedCount", newLike);
  }, [likedThoughts]);

  return (
    <div className="text-center mt-4 text-base">
      <span>You've liked {count} thoughts</span>
    </div>
  );
};