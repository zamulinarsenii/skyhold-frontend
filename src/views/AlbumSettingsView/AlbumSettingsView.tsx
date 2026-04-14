import "./AlbumSettingsView.css";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { useParams } from "react-router-dom";
import AlbumSettings from "../../components/UserComponents/AlbumSettings/AlbumSettings";
import { useLocation } from "react-router-dom";

export default function AlbumSettingsView() {
  const { id } = useParams<{ id: string }>();
  const albumId = Number(id);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const isShared = path === "shared-albums";
  return (
    <main>
      <div className="view-title">
        <Link
          to={`/${path}/${albumId}`}
          className="flex items-center gap-2 font-size-14"
        >
          <IoChevronBack size={24}></IoChevronBack>
          <h1>Настройки альбома</h1>
        </Link>
      </div>
      <AlbumSettings albumId={albumId} isShared={isShared}></AlbumSettings>
    </main>
  );
}
