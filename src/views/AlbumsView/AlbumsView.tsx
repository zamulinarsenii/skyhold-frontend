import { useFetchAlbumsQuery } from "../../api/hooks/albums/useFetchAlbumsQuery";
import Albums from "../../components/UserComponents/Albums/Albums";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import CreateAlbumPopup from "../../components/UserComponents/CreateAlbumPopup/CreateAlbumPopup";
import "./AlbumsView.css";

export default function AlbumsView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main>
      <div className="view-title">
        <h1>Ваши альбомы</h1>
        <button className="shyhold-btn" onClick={() => setIsModalOpen(true)}>
          <FaPlus></FaPlus>Создать
        </button>
        {isModalOpen && (
          <CreateAlbumPopup
            onClose={() => setIsModalOpen(false)}
          ></CreateAlbumPopup>
        )}
      </div>
      <Albums></Albums>
    </main>
  );
}
