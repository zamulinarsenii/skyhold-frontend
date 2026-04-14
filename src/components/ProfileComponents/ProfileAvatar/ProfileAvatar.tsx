import { useGetAvatarByIdQuery } from "../../../api/hooks/avatar/useGetAvatarByIdQuery";
import { MdAccountCircle } from "react-icons/md";
import "./ProfileAvatar.css";

interface ProfileAvatarProps {
  id: number;
}

export default function ProfileAvatar({ id }: ProfileAvatarProps) {
  const { avatarUrl } = useGetAvatarByIdQuery(id);
  return (
    <div>
      {avatarUrl ? (
        <img className="user-avatar" src={avatarUrl} alt="Аватар" />
      ) : (
        <MdAccountCircle className="user-avatar" />
      )}
    </div>
  );
}
