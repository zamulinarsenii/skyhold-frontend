import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../api/hooks/user/useGetUserByIdQuery";
import UserAvatar from "../../components/ProfileComponents/ProfileAvatar/ProfileAvatar";
import "./UserView.css";
import Albums from "../../components/ProfileComponents/Albums/Albums";
import { useGetUserPublicAlbumsQuery } from "../../api/hooks/albums/profile/useGetUserPublicAlbumsQuery";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useCreateFriendMutation } from "../../api/hooks/friends/useCreateFriendMutation";
import { FaUserPlus } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function UserView() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const { mutate: createFriend } = useCreateFriendMutation();
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGetUserByIdQuery(userId);
  const {
    data: albums,
    isLoading: albumsLoading,
    isError,
  } = useGetUserPublicAlbumsQuery(userId);

  const [allAlbums, setAllAlbums] = useState<any[]>([]);
  const [filterByVisibility, setFilterByVisibility] = useState("all");

  useEffect(() => {
    if (albums) {
      setAllAlbums(albums);
    }
  }, [albums]);

  useEffect(() => {
    if (albums) {
      if (filterByVisibility === "all") setAllAlbums(albums);
      else if (filterByVisibility === "public")
        setAllAlbums(albums.filter((album) => album.visibility === "public"));
      else if (filterByVisibility === "friends")
        setAllAlbums(albums.filter((album) => album.visibility === "friends"));
    }
  }, [filterByVisibility]);

  if (userLoading) return <div>Загрузка профиля...</div>;
  if (userError || !user) return <div>Пользователь не найден</div>;

  return (
    <main>
      {user.friend ? (
        <div className="view-title">
          <Link to="/friends" className="flex gap-2 items-center">
            <IoChevronBack size={24}></IoChevronBack>
            <h1>Профиль {user.login}</h1>
          </Link>
        </div>
      ) : (
        <div className="view-title">
          <h1>Профиль {user.login}</h1>
        </div>
      )}

      <div className="profile-container">
        <UserAvatar id={user.id} />
        {!user.friend && (
          <button
            className="profile-container__add-friend"
            onClick={() => createFriend(user.id)}
          >
            <span>Добавить в друзья</span>
            <FaUserPlus size={24}></FaUserPlus>
          </button>
        )}
        <div className="profile-container__albums-title">Альбомы</div>
        <div className="albums-filter">
          <button onClick={() => setFilterByVisibility("all")}>Все</button>
          <button onClick={() => setFilterByVisibility("public")}>
            Публичные
          </button>
          <button onClick={() => setFilterByVisibility("friends")}>
            Для друзей
          </button>
        </div>
        {!albumsLoading ? (
          <Albums
            profileId={userId}
            albums={allAlbums!}
            login={user.login}
          ></Albums>
        ) : (
          <div>Загрузка альбомов...</div>
        )}
      </div>
    </main>
  );
}
