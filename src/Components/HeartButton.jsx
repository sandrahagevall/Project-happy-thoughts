import { useState } from "react";
import heartbeatSound from "../assets/Heartbeat.mp3";

export const HeartButton = ({ onClick, hearts }) => {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    const sound = new Audio(heartbeatSound);
    sound.play();

    setPressed(true);
    setTimeout(() => setPressed(false), 150);

    onClick();
  }


  return (
    <button
      onClick={handleClick}
      aria-label={`Like this thought. It currently has ${hearts} likes`}
      className={`${hearts > 0 ? "bg-happy" : "bg-gray-200 hover:bg-happy"} 
                w-12 h-12 rounded-full transition-colors shadow-sm cursor-pointer
                transform duration-150 ${pressed ? "scale-120" : "scale-100"}`}
    >
      ❤️
    </button>
  )
}
