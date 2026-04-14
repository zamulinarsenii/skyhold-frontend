// src/router/index.tsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "../components/GlobalComponents/Header/Header";
import LoginView from "../views/LoginView/LoginView";
import MainView from "../views/MainView/MainView";
import RegistrationView from "../views/RegistrationView/RegistrationView";
import ProfileView from "../views/ProfileView/ProfileView";
import ProtectedRoute from "./ProtectedRoute";
import FavoriteView from "../views/FavoriteView/FavoriteView";
import AlbumsView from "../views/AlbumsView/AlbumsView";
import AlbumChooseView from "../views/AlbumChooseView/AlbumChooseView";
import AlbumView from "../views/AlbumView/AlbumView";
import BasketView from "../views/BasketView/BasketView";
import FriendsView from "../views/FriendsView/FriendsView";
import UserView from "../views/UserView/UserView";
import ProfileAlbumView from "../views/ProfileAlbumView/ProfileAlbumView";
import SharedAlbumsView from "../views/SharedAlbumsView/SharedAlbumsView";
import SharedAlbumView from "../views/SharedAlbumView/SharedAlbumView";
import AlbumSettingsView from "../views/AlbumSettingsView/AlbumSettingsView";

function AppContent() {
  const location = useLocation();
  // Список путей, где Header не должен отображаться
  const hideHeaderPaths = ["/login", "/registration"];
  const showHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/registration" element={<RegistrationView />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainView />} />
          <Route path="/favorite" element={<FavoriteView />} />
          <Route path="/albums" element={<AlbumsView />} />
          <Route path="/shared-albums" element={<SharedAlbumsView />} />
          <Route
            path="/shared-albums/:paramsAlbumId"
            element={<SharedAlbumView />}
          />
          <Route path="/basket" element={<BasketView />} />
          <Route path="/albums/:id" element={<AlbumView />} />
          <Route path="/albums/:id/settings" element={<AlbumSettingsView />} />
          <Route
            path="/shared-albums/:id/settings"
            element={<AlbumSettingsView />}
          />
          <Route path="/friends" element={<FriendsView />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/profile/:id" element={<UserView />} />
          <Route
            path="/profile/:paramsUserId/albums/:paramsAlbumId"
            element={<ProfileAlbumView />}
          />
          <Route path="/choose-album" element={<AlbumChooseView />} />
        </Route>
      </Routes>
    </>
  );
}

export default function AppRouter() {
  return <AppContent />;
}
