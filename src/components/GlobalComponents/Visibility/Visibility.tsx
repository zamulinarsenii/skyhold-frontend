import { FaUserLock, FaLock, FaUnlock, FaUserFriends } from "react-icons/fa";
import "./Visibility.css";
interface VisibilityProps {
  visibility: string;
}

export default function Visibility({ visibility }: VisibilityProps) {
  const text: Record<string, string> = {
    public: "Открытый",
    private: "Закрытый",
    friends: "Друзья",
    selected_friends: "Избранные",
  };
  const iconSize = 20;
  return (
    <div className={`album-visibility visibility-${visibility}`}>
      <span>{text[visibility] || visibility}</span>
      {visibility === "public" && <FaUnlock size={iconSize}></FaUnlock>}
      {visibility === "private" && <FaLock size={iconSize}></FaLock>}
      {visibility === "friends" && (
        <FaUserFriends size={iconSize}></FaUserFriends>
      )}
      {visibility === "selected_friends" && (
        <FaUserLock size={iconSize}></FaUserLock>
      )}
    </div>
  );
}
