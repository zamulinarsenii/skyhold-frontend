import { IoMdSettings } from "react-icons/io";
import "./BtnAlbumSettings.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Link } from "react-router-dom";
interface Props {
  link: string;
  ownerId: number;
  albumId: number;
}

export default function BtnAlbumSettings({ link, ownerId, albumId }: Props) {
  const user = useSelector((state: RootState) => state.user.user);
  if (user && user.id !== ownerId) return;
  return (
    <Link to={`/${link}/${albumId}/settings`}>
      <button className="btn-album-settings">
        <IoMdSettings size={24} />
      </button>
    </Link>
  );
}
