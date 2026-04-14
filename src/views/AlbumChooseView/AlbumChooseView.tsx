import { useFetchAlbumsQuery } from "../../api/hooks/albums/useFetchAlbumsQuery";
import "./AlbumChooseView.css";
import { useAddImagesToAlbumMutation } from "../../api/hooks/albums/useAddImagesToAlbumMutation";
import { useGetSharedAlbumsQuery } from "../../api/hooks/sharedAlbums/useGetSharedAlbumsQuery";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import Album from "../../components/GlobalComponents/Album/Album";

export default function AlbumChooseView() {
  const {
    data: albums,
    isLoading: albumsLoading,
    isError: albumsError,
  } = useFetchAlbumsQuery();
  const {
    data: sharedAlbums,
    isLoading: sharedAlbumsLoading,
    isError: sharedAlbumsError,
  } = useGetSharedAlbumsQuery();
  const { mutate: addImagesToAlbum } = useAddImagesToAlbumMutation();
  const selector = useSelector((state: RootState) => state.selector.selector);

  const handleAddImagesToAlbum = (albumId: number) => {
    if (selector && selector.length > 0)
      addImagesToAlbum({ albumId: albumId, imageIds: selector });
  };

  if (albumsLoading || sharedAlbumsLoading) return <div>Загрузка...</div>;
  if (albumsError || sharedAlbumsError) return <div>Ошибка</div>;
  return (
    <main>
      <div className="view-title">
        <h1>Выберите альбом</h1>
        <Link to="/" className="flex items-center gap-1 font-size-14">
          <IoChevronBack></IoChevronBack>Назад
        </Link>
      </div>
      {albums!.length > 0 ? (
        <div className="flex gap-4 flex-wrap">
          {albums?.map((album) => (
            <div
              key={album.id}
              onClick={() => {
                handleAddImagesToAlbum(album.id);
              }}
            >
              <Album album={album}></Album>
            </div>
          ))}
          {sharedAlbums?.map((item) => (
            <div
              key={item.album.id}
              onClick={() => {
                handleAddImagesToAlbum(item.album.id);
              }}
            >
              <Album album={item.album} memberIds={item.memberIds}></Album>
            </div>
          ))}
        </div>
      ) : (
        <span>У вас пока нет альбомов</span>
      )}
    </main>
  );
}
