import ProfileAvatar from "../../ProfileComponents/ProfileAvatar/ProfileAvatar";
import "./FoundUser.css";
import { FaUserPlus } from "react-icons/fa";
import { useCreateFriendMutation } from "../../../api/hooks/friends/useCreateFriendMutation";

interface FoundUserProps {
  user: User;
}

interface User {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
}

export default function FoundUser({ user }: FoundUserProps) {
  const { mutate: createFriend } = useCreateFriendMutation();
  return (
    <div className="found-user">
      <ProfileAvatar id={user.id}></ProfileAvatar>
      <span>{user.login}</span>
      <button onClick={() => createFriend(user.id)}>
        <FaUserPlus size={24}></FaUserPlus>
      </button>
    </div>
  );
}
