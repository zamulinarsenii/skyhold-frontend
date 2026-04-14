// src/views/AlbumView/AlbumView.tsx
import { useParams } from "react-router-dom";
import ImagesPaginated from "../../components/GlobalComponents/ImagesPaginated/ImagesPaginated";
import { useGetAlbumByIdQuery } from "../../api/hooks/albums/useGetAlbumByIdQuery";
import Visibility from "../../components/GlobalComponents/Visibility/Visibility";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import BtnAlbumSettings from "../../components/GlobalComponents/BtnAlbumSettings/BtnAlbumSettings";
import SelectImages from "../../components/GlobalComponents/SelectImages/SelectImages";
import { useState } from "react";

export default function AlbumView() {
  const { id } = useParams<{ id: string }>();
  const albumId = Number(id);
  const { data: album, isLoading, isError } = useGetAlbumByIdQuery(albumId);

  const [selectMode, setSelectMode] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectMode = () => setSelectMode((prev) => !prev);
  const toggleSelectAll = () => setSelectAll((prev) => !prev);

  if (isLoading)
    return (
      <main>
        <div className="view-title">Загрузка альбома...</div>
      </main>
    );
  if (isError)
    return (
      <main>
        <div className="view-title">Ошибка при загрузке альбома...</div>
      </main>
    );
  return (
    <main>
      <div className="view-title">
        {!selectMode && (
          <>
            <Link to="/albums" className="flex gap-2 items-center">
              <IoChevronBack size={24}></IoChevronBack>
              <h1>Альбом {album!.name}</h1>
            </Link>
            <Visibility visibility={album!.visibility}></Visibility>
          </>
        )}

        <SelectImages
          select={selectMode}
          selectAll={selectAll}
          toggleSelect={toggleSelectMode}
          toggleSelectAll={toggleSelectAll}
          albumId={album!.id}
        ></SelectImages>
        <BtnAlbumSettings
          link={"albums"}
          ownerId={album!.ownerId}
          albumId={album!.id}
        />
      </div>

      <ImagesPaginated
        key={albumId}
        source="album"
        albumId={albumId}
        select={selectMode}
        selectAll={selectAll}
      ></ImagesPaginated>
    </main>
  );
}
