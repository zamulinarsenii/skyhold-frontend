import "./AlbumSettings.css";
import { useGetSharedAlbumByIdQuery } from "../../../api/hooks/sharedAlbums/useGetSharedAlbumByIdQuery";
import { useGetAlbumByIdQuery } from "../../../api/hooks/albums/useGetAlbumByIdQuery";
import { useUpdateAlbumMutation } from "../../../api/hooks/albums/useUpdateAlbumMutation";
import { useUpdateSharedAlbumMutation } from "../../../api/hooks/sharedAlbums/useUpdateSharedAlbumMutation";
import { useGetFriendsQuery } from "../../../api/hooks/friends/useGetFriendsQuery";
import { Album } from "../../../interfaces/albums";
import { useState, useEffect, useMemo } from "react";
import SmartInput from "../../GlobalComponents/SmartInput/SmartInput";
import SmartSelector from "../../GlobalComponents/SmartSelector/SmartSelector";
import MembersSelector from "../MembersSelector/MembersSelector";

interface Props {
  albumId: number;
  isShared?: boolean;
}

const items = [
  { text: "Только вы", value: "private" },
  { text: "Все", value: "public" },
  { text: "Все друзья", value: "friends" },
];

// Вспомогательная функция для сравнения массивов
const arraysEqual = (a: number[], b: number[]): boolean => {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((x, y) => x - y);
  const sortedB = [...b].sort((x, y) => x - y);
  return sortedA.every((val, idx) => val === sortedB[idx]);
};

export default function AlbumSettings({ albumId, isShared = false }: Props) {
  const { data, isLoading, isError } = isShared
    ? useGetSharedAlbumByIdQuery(albumId)
    : useGetAlbumByIdQuery(albumId);
  const { mutate: updateAlbum, isPending: isSaving } = isShared
    ? useUpdateSharedAlbumMutation(albumId)
    : useUpdateAlbumMutation(albumId);

  const { data: friends, isLoading: friendsLoading } = useGetFriendsQuery();

  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState("");
  const [memberIds, setMemberIds] = useState<number[]>([]);

  // Инициализация при получении данных
  useEffect(() => {
    if (data) {
      if (isShared) {
        const sharedData = data as { album: Album; memberIds: number[] };
        setName(sharedData.album.name);
        setMemberIds(sharedData.memberIds);
      } else {
        const album = data as Album;
        setName(album.name);
        setVisibility(album.visibility);
      }
    }
  }, [data, isShared]);

  // Получение оригинальных значений для сравнения
  const originalValues = useMemo(() => {
    if (!data) return null;
    if (isShared) {
      const sharedData = data as { album: Album; memberIds: number[] };
      return {
        name: sharedData.album.name,
        memberIds: sharedData.memberIds,
      };
    } else {
      const album = data as Album;
      return {
        name: album.name,
        visibility: album.visibility,
      };
    }
  }, [data, isShared]);

  // Проверка наличия изменений
  const hasChanges = useMemo(() => {
    if (!originalValues) return false;

    if (isShared) {
      return (
        name !== originalValues.name ||
        !arraysEqual(memberIds, originalValues.memberIds!)
      );
    } else {
      return (
        name !== originalValues.name || visibility !== originalValues.visibility
      );
    }
  }, [name, visibility, memberIds, originalValues, isShared]);

  const handleSave = () => {
    if (isShared) {
      updateAlbum({
        albumId,
        album: { name, memberIds },
      });
    } else {
      updateAlbum({
        albumId,
        album: { name, visibility },
      });
    }
  };

  if (isLoading || friendsLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки</div>;

  return (
    <div className="album-settings-container">
      <SmartInput
        type="text"
        name="Название"
        placeholder="Название"
        value={name}
        onChange={setName}
        hideHits
      />
      {isShared ? (
        <>
          {friends && friends.length > 0 && (
            <MembersSelector
              friends={friends}
              onChange={setMemberIds}
              name="Кому доступен альбом"
              placeholder="Участники"
              value={memberIds}
              showSearch
            />
          )}
        </>
      ) : (
        <SmartSelector
          items={items}
          value={visibility}
          onChange={setVisibility}
          name="Кому доступен альбом"
          placeholder="Видимость"
          showSearch={false}
        />
      )}

      <button
        className={`album-settings-container__save-btn${hasChanges ? " album-has-changes" : ""}`}
        onClick={handleSave}
        disabled={isSaving || !hasChanges}
      >
        {isSaving ? "Сохранение..." : "Сохранить"}
      </button>
    </div>
  );
}
