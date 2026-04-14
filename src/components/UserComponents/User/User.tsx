import ProfileAvatar from "../../ProfileComponents/ProfileAvatar/ProfileAvatar";
import "./FoundUser.css";
import { Link } from "react-router-dom";
interface UserProps {
  user: User;
}

interface User {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
}

export default function User({ user }: UserProps) {
  return (
    <Link to={`/profile/${user.id}`}>
      <div className="found-user">
        <ProfileAvatar id={user.id}></ProfileAvatar>
        <div className="found-user-name">
          <span>
            {user.firstName} {user.lastName}
          </span>
          <span>{user.login}</span>
        </div>
      </div>
    </Link>
  );
}
