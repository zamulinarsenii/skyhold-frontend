import { Album } from "../../../interfaces/albums";
import "./Album.css";
import { ImageThumbnail } from "../ImageThumbnail/ImageThumbnail";
import { BiPhotoAlbum } from "react-icons/bi";
import SharedAlbumMemberAvatars from "../../UserComponents/SharedAlbumMemberAvatars/SharedAlbumMemberAvatars";

interface AlbumProps {
  album: Album;
  memberIds?: number[];
}

export default function Album({ album, memberIds }: AlbumProps) {
  return (
    <div className="album-container">
      <div className="album-image">
        {album.lastImageId ? (
          <ImageThumbnail
            id={album.lastImageId}
            name={album.name}
          ></ImageThumbnail>
        ) : (
          <BiPhotoAlbum className="album-image-icon"></BiPhotoAlbum>
        )}
        {memberIds && (
          <SharedAlbumMemberAvatars memberIds={memberIds} container />
        )}
      </div>
      <div className="album-info">
        <span>{album.name}</span>
        <span>{album.imageCount}</span>
      </div>
    </div>
  );
}
