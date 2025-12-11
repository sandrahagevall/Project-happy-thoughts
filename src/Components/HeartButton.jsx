import { useState } from "react";
import heartbeatSound from "../assets/Heartbeat.mp3";

export const HeartButton = ({ onClick, hearts }) => {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    const sound = new Audio(heartbeatSound);
    sound.play().catch(() => { }); // ← So the sound don't crash on the first click.

    setPressed(true);
    setTimeout(() => setPressed(false), 150);

    onClick();
  };


  return (
    <button
      onClick={handleClick}
      aria-label={`Like this thought. It currently has ${hearts} likes`}
      className={`${hearts > 0 ? "bg-happy" : "bg-gray hover:bg-happy"} 
                w-12 h-12 rounded-full transition-colors shadow-sm cursor-pointer
                transform duration-150 ${pressed ? "scale-110" : "scale-100"}`}
    >
      ❤️
    </button>
  )
};
