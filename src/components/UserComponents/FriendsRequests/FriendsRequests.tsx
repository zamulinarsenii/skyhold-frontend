import { FaBell } from "react-icons/fa";
import { useGetRequestsToFriendsQuery } from "../../../api/hooks/friends/useGetRequestsToFriendsQuery";
import { useAcceptFriendMutation } from "../../../api/hooks/friends/useAcceptFriendMutation";
import { useDeclineFriendMutation } from "../../../api/hooks/friends/useDeclineFriendMutation";
import { useState } from "react";
import "./FriendsRequests.css";
import ProfileAvatar from "../../ProfileComponents/ProfileAvatar/ProfileAvatar";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
export default function FriendsRequests() {
  const { data: requests, isLoading, error } = useGetRequestsToFriendsQuery();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: acceptFriend } = useAcceptFriendMutation();
  const { mutate: declineFriend } = useDeclineFriendMutation();
  const hasRequests = requests && requests.length > 0;

  return (
    <div>
      <div
        className={`friends-bell ${hasRequests ? "hasRequests" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBell />
      </div>
      {isOpen && (
        <div className="friends-bell-dropdown-menu">
          {isLoading && <div className="dropdown-loading">Загрузка...</div>}
          {error && <div className="dropdown-error">Ошибка загрузки</div>}

          {hasRequests ? (
            requests.map((user) => (
              <div key={user.id} className="dropdown-item">
                <ProfileAvatar id={user!.id}></ProfileAvatar>
                <span className="dropdown-login">{user.login}</span>
                <div className="dropdown-actions">
                  <button
                    className="accept-btn"
                    onClick={() => acceptFriend(user.id)}
                  >
                    <FaUserPlus size={22}></FaUserPlus>
                  </button>
                  <button
                    className="decline-btn"
                    onClick={() => declineFriend(user.id)}
                  >
                    <FaUserMinus size={22}></FaUserMinus>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="dropdown-empty">Нет входящих заявок</div>
          )}
        </div>
      )}
    </div>
  );
}
