import { Link } from "react-router-dom";
import Album from "../../GlobalComponents/Album/Album";
import { Album as AlbumInterface } from "../../../interfaces/albums";
import "./Albums.css";

interface AlbumsProps {
  profileId: number;
  albums: AlbumInterface[];
  login: string;
}

export default function Albums({ profileId, albums, login }: AlbumsProps) {
  return (
    <>
      {albums!.length > 0 ? (
        <div className="albums-container">
          {albums?.map((album) => (
            <Link
              to={`/profile/${profileId}/albums/${album.id}`}
              key={album.id}
            >
              <Album album={album}></Album>
            </Link>
          ))}
        </div>
      ) : (
        <span>У {login} пока нет альбомов</span>
      )}
    </>
  );
}
