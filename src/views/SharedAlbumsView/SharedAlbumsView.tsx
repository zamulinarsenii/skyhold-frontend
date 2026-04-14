import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import CreateSharedAlbumPopup from "../../components/UserComponents/CreateSharedAlbumPopup/CreateSharedAlbumPopup";
import SharedAlbums from "../../components/UserComponents/SharedAlbums/SharedAlbums";
export default function SharedAlbumsView() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <div className="view-title">
        <h1>Общие альбомы</h1>
        <button className="shyhold-btn" onClick={() => setIsModalOpen(true)}>
          <FaPlus />
          Создать
        </button>
        {isModalOpen && (
          <CreateSharedAlbumPopup
            onClose={() => setIsModalOpen(false)}
          ></CreateSharedAlbumPopup>
        )}
      </div>
      <SharedAlbums></SharedAlbums>
    </main>
  );
}
