import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import BtnAlbumSettings from "../../components/GlobalComponents/BtnAlbumSettings/BtnAlbumSettings";
import { useGetSharedAlbumByIdQuery } from "../../api/hooks/sharedAlbums/useGetSharedAlbumByIdQuery";
import SharedAlbumMemberAvatars from "../../components/UserComponents/SharedAlbumMemberAvatars/SharedAlbumMemberAvatars";
import SelectImages from "../../components/GlobalComponents/SelectImages/SelectImages";
import { useState } from "react";
import ImagesPaginated from "../../components/GlobalComponents/ImagesPaginated/ImagesPaginated";

export default function SharedAlbumView() {
  const { paramsAlbumId } = useParams<{
    paramsAlbumId: string;
  }>();
  const albumId = Number(paramsAlbumId);
  const { data, isLoading, isError } = useGetSharedAlbumByIdQuery(albumId);

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
            <Link to={`/shared-albums`} className="flex gap-2 items-center">
              <IoChevronBack size={24}></IoChevronBack>
              <h1>Альбом {data!.album.name}</h1>
            </Link>
            <SharedAlbumMemberAvatars memberIds={data!.memberIds} />
          </>
        )}
        <SelectImages
          select={selectMode}
          selectAll={selectAll}
          toggleSelect={toggleSelectMode}
          toggleSelectAll={toggleSelectAll}
          albumId={data!.album.id}
          canDelete={false}
        />
        <BtnAlbumSettings
          link={"shared-albums"}
          ownerId={data!.album.ownerId}
          albumId={data!.album.id}
        />
      </div>
      <ImagesPaginated
        source="album"
        albumId={data!.album.id}
        select={selectMode}
        selectAll={selectAll}
      ></ImagesPaginated>
    </main>
  );
}
