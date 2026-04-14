import { useFetchAlbumsQuery } from "../../../api/hooks/albums/useFetchAlbumsQuery";
import { Link } from "react-router-dom";
import Album from "../../GlobalComponents/Album/Album";

export default function Albums() {
  const { data: albums, isLoading, isError } = useFetchAlbumsQuery();

  if (isLoading) return <div>Загрузка альбомов...</div>;
  if (isError) return <div>Ошибка при загрузке альбомов</div>;
  if (albums && albums.length === 0) return <div>У вас пока нет альбомов</div>;
  return (
    <div className="scroll-container">
      <div className="scroll-container-grid">
        {albums?.map((album) => (
          <Link to={`/albums/${album.id}`} key={album.id}>
            <Album album={album}></Album>
          </Link>
        ))}
      </div>
    </div>
  );
}
