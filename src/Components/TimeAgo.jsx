import { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const TimeAgo = ({ createdAt }) => {
  const getTimeAgo = () => dayjs(createdAt).fromNow();
  const [timeAgo, setTimeAgo] = useState(getTimeAgo());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo());
    }, 60000);

    return () => clearInterval(interval);
  }, [createdAt]);


  return (
    <span className="text-xs text-gray-500 font-sans">
      {timeAgo}
    </span>
  );
};