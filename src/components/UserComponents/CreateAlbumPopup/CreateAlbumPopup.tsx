import SmartInput from "../../GlobalComponents/SmartInput/SmartInput";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import "./CreateAlbumPopup.css";
import SmartSelector from "../../GlobalComponents/SmartSelector/SmartSelector";
import { useCreateAlbumMutation } from "../../../api/hooks/albums/useCreateAlbumMutation";
interface CreateAlbumPopupProps {
  onClose: () => void;
}
const items = [
  { text: "Только вы", value: "private" },
  { text: "Все", value: "public" },
  { text: "Все друзья", value: "friends" },
];
export default function CreateAlbumPopup({ onClose }: CreateAlbumPopupProps) {
  const { mutate: createAlbum } = useCreateAlbumMutation();
  const [albumName, setAlbumName] = useState("");
  const [visibility, setVisibility] = useState("private");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const submitAlbum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visibility || !albumName) return;
    createAlbum({ name: albumName, visibility: visibility });
    onClose();
  };

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <form className="create-album-popup__container" onSubmit={submitAlbum}>
        <IoClose
          size={20}
          className="create-album-popup__close"
          onClick={onClose}
        ></IoClose>
        <span>Создать альбом</span>
        <SmartInput
          type="text"
          placeholder="Название"
          value={albumName}
          onChange={(val) => setAlbumName(val)}
          required
        ></SmartInput>
        <span>Кому доступен альбом</span>
        <SmartSelector
          items={items}
          value={visibility}
          onChange={setVisibility}
          placeholder="Видимость"
          showSearch={false}
        />
        <button type="submit" className="mt-4">
          Создать
        </button>
      </form>
    </div>
  );
}
