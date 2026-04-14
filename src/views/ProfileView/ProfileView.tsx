import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { logout } from "../../store/slices/userSlice";
import "./ProfileView.css";
import logoutIcon from "../../assets/icons/logout.svg";
import ProfileAvatar from "../../components/UserComponents/UserAvatar/UserAvatar";

function ProfileView() {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Открыть аватар в модальном окне
  return (
    <main>
      <div className="view-title">
        <h1>Профиль</h1>
      </div>
      <div className="profile-data">
        <ProfileAvatar></ProfileAvatar>
        <div>
          <span className="mr-2">{user?.firstName}</span>
          <span>{user?.lastName}</span>
        </div>
        <span className="opacity-50">{user?.login}</span>
        <span className="opacity-50">{user?.email}</span>
        <button onClick={handleLogout} className="logout-btn">
          <img src={logoutIcon} alt="Выход" />
          Выход
        </button>
      </div>
    </main>
  );
}

export default ProfileView;
