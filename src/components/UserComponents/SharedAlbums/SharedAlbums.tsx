import { useGetSharedAlbumsQuery } from "../../../api/hooks/sharedAlbums/useGetSharedAlbumsQuery";
import Album from "../../GlobalComponents/Album/Album";
import { Link } from "react-router-dom";
export default function SharedAlbums() {
  const { data: albums, isLoading, isError } = useGetSharedAlbumsQuery();
  if (isLoading) return <div>Загрузка альбомов...</div>;
  if (isError) return <div>Ошибка загрузки альбомов</div>;
  if (albums?.length === 0) return <div>У вас пока нет альбомов</div>;
  return (
    <div className="scroll-container">
      <div className="scroll-container-grid">
        {albums?.map((item) => (
          <Link to={`/shared-albums/${item.album.id}`} key={item.album.id}>
            <Album album={item.album} memberIds={item.memberIds}></Album>
          </Link>
        ))}
      </div>
    </div>
  );
}
