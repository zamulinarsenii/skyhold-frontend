import { useParams } from "react-router-dom";
import { useGetAlbumByIdQuery } from "../../api/hooks/albums/useGetAlbumByIdQuery";
import ImagesPaginated from "../../components/GlobalComponents/ImagesPaginated/ImagesPaginated";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

export default function ProfileAlbumView() {
  const { paramsAlbumId, paramsUserId } = useParams<{
    paramsAlbumId: string;
    paramsUserId: string;
  }>();
  const userId = Number(paramsUserId);
  const albumId = Number(paramsAlbumId);
  const { data: album, isLoading, isError } = useGetAlbumByIdQuery(albumId);
  if (isLoading) return <div>Загрузка альбома...</div>;
  if (isError) return <div>Ошибка при загрузке альбома...</div>;
  return (
    <main>
      <div className="view-title">
        <Link to={`/profile/${userId}`} className="flex gap-2 items-center">
          <IoChevronBack size={24}></IoChevronBack>
          <h1>Альбом {album!.name}</h1>
        </Link>
      </div>
      <ImagesPaginated source="album" albumId={album!.id}></ImagesPaginated>
    </main>
  );
}
