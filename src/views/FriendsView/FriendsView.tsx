import { useGetFriendsQuery } from "../../api/hooks/friends/useGetFriendsQuery";
import { useGetNewFriendsQuery } from "../../api/hooks/friends/useGetNewFriendsQuery";
import SmartInput from "../../components/GlobalComponents/SmartInput/SmartInput";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import "./FriendsView.css";
import { useDebounce } from "../../helpers/useDebounce";
import FoundUser from "../../components/UserComponents/User/FoundUser";
import User from "../../components/UserComponents/User/User";
import FriendsRequests from "../../components/UserComponents/FriendsRequests/FriendsRequests";

export default function FriendsView() {
  const { data: friends, isLoading: friendsLoading } = useGetFriendsQuery();
  const [friendLogin, setFriendLogin] = useState("");

  const debouncedLogin = useDebounce(friendLogin, 500);

  const { data: searchResults, isLoading: searchLoading } =
    useGetNewFriendsQuery(debouncedLogin);

  const showSearchResults = debouncedLogin.trim().length > 0;

  return (
    <main>
      <div className="view-title">
        <h1>Друзья</h1>
        <div className="search-input-container">
          <SmartInput
            type="text"
            placeholder="Поиск"
            value={friendLogin}
            onChange={setFriendLogin}
            hideHits
          />
          <IoSearch className="search-input-icon" size={22} />
          {searchLoading && <span className="spinner">Поиск...</span>}
        </div>
        <FriendsRequests></FriendsRequests>
      </div>
      {showSearchResults ? (
        <div className="search-list">
          {searchResults?.length > 0 ? (
            searchResults.map((user) => (
              <FoundUser key={user.id} user={user}></FoundUser>
            ))
          ) : (
            <p>Ничего не найдено</p>
          )}
        </div>
      ) : (
        <div className="friends-list">
          {!friendsLoading &&
            friends?.map((friend) => (
              <User key={friend.id} user={friend}></User>
            ))}
        </div>
      )}
    </main>
  );
}
