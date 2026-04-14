import SmartInput from "../../GlobalComponents/SmartInput/SmartInput";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import "./CreateSharedAlbumPopup.css";
import MembersSelector from "../MembersSelector/MembersSelector";
import { useCreateSharedAlbumMutation } from "../../../api/hooks/sharedAlbums/useCreateSharedAlbumMutation";
import { useGetFriendsQuery } from "../../../api/hooks/friends/useGetFriendsQuery";

interface CreateSharedAlbumPopupProps {
  onClose: () => void;
}

export default function CreateSharedAlbumPopup({
  onClose,
}: CreateSharedAlbumPopupProps) {
  const { mutate: createAlbum } = useCreateSharedAlbumMutation();
  const { data: friends, isLoading: friendsLoading } = useGetFriendsQuery();

  const [albumName, setAlbumName] = useState("");
  const [memberIds, setMemberIds] = useState<number[]>([]);

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
    if (!albumName) return;
    createAlbum({ memberIds: memberIds, name: albumName });
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
        {friends && friends?.length > 0 && (
          <MembersSelector
            friends={friends}
            onChange={setMemberIds}
            placeholder="Участники"
            value={memberIds}
            showSearch
          />
        )}

        <button type="submit" className="mt-4">
          Создать
        </button>
      </form>
    </div>
  );
}
