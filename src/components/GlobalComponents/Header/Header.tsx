import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import "./Header.css";
import {
  FaUpload,
  FaTrashAlt,
  FaHeart,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import { BiSolidPhotoAlbum } from "react-icons/bi";
import { useFetchAvatarQuery } from "../../../api/hooks/avatar/useFetchAvatarQuery";
import { useUploadImagesMutation } from "../../../api/hooks/images/useUploadImagesMutation";
import { MdAccountCircle, MdInsertPhoto } from "react-icons/md";
import { useRef } from "react";
import PopupAlert from "../PopupAlert/PopupAlert";

export default function Header() {
  const user = useSelector((state: RootState) => state.user.user);
  const { avatarUrl } = useFetchAvatarQuery();
  const { mutate: uploadImages, isPending } = useUploadImagesMutation();
  const filesInputRef = useRef<HTMLInputElement>(null);

  const handleUploadImages = () => {
    filesInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      uploadImages(files);
      e.target.value = "";
    }
  };
  return (
    <>
      <header className="app-header">
        <div className="header-container">
          <nav>
            <Link to="/" className="skyhold">
              SKYHOLD
            </Link>
            <button
              className="nav-btn mb-3"
              onClick={handleUploadImages}
              disabled={isPending}
            >
              {isPending ? "Загрузка..." : <FaUpload className="icon" />}
              Загрузить
            </button>
            <input
              type="file"
              ref={filesInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
              multiple
            />
            <Link to="/" className="nav-link">
              <MdInsertPhoto className="icon" />
              <span>Фотографии</span>
            </Link>
            <Link to="/albums" className="nav-link">
              <BiSolidPhotoAlbum className="icon" />
              <span>Альбомы</span>
            </Link>
            <Link to="/shared-albums" className="nav-link">
              <FaUsers className="icon" />
              <span>Общие альбомы</span>
            </Link>
            <Link to="/basket" className="nav-link">
              <FaTrashAlt className="icon" />
              <span>Корзина</span>
            </Link>
            <Link to="/favorite" className="nav-link">
              <FaHeart className="icon" />
              <span>Избранное</span>
            </Link>
            <Link to="/friends" className="nav-link">
              <FaUserFriends className="icon"></FaUserFriends>
              <span>Друзья</span>
            </Link>
          </nav>
          <div className="flex gap-2 items-center">
            <Link to="/profile" className="flex gap-2 items-center">
              {avatarUrl ? (
                <img className="profile-avatar" src={avatarUrl} alt="Аватар" />
              ) : (
                <MdAccountCircle className="profile-avatar" />
              )}
              <span>{user?.firstName}</span>
            </Link>
          </div>
        </div>
      </header>
      <PopupAlert></PopupAlert>
    </>
  );
}
