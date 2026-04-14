import { FaTrashAlt } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import "./UserAvatar.css";
import { useUploadAvatarMutation } from "../../../api/hooks/avatar/useUploadAvatarMutation";
import { useFetchAvatarQuery } from "../../../api/hooks/avatar/useFetchAvatarQuery";
import { useRef } from "react";

export default function UserAvatar() {
  const { avatarUrl } = useFetchAvatarQuery();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending, isError } = useUploadAvatarMutation();

  const handleChangeAvatar = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      mutate(file);
      e.target.value = "";
    }
  };

  const handleDeleteAvatar = async () => {};

  return (
    <div className="avatar-dropdown">
      {avatarUrl ? (
        <img className="profile-avatar" src={avatarUrl} alt="Аватар" />
      ) : (
        <MdAccountCircle className="profile-avatar" />
      )}
      <div className="dropdown-menu">
        <div className="dropdown-menu-btns">
          <button onClick={handleChangeAvatar}>
            <BsFillPencilFill size={16} />
            Изменить фото
          </button>
          <button onClick={handleDeleteAvatar}>
            <FaTrashAlt color="red" size={16} />
            Удалить фото
          </button>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
