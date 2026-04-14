import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useToggleFavoriteMutation } from "../../../api/hooks/images/useToggleFavoriteMutation";

export default function FavoriteBtn({
  id,
  favorite,
}: {
  id: number;
  favorite: boolean;
}) {
  const { mutate: changeFavorite } = useToggleFavoriteMutation(id);
  return (
    <button
      className="toggle-favorite-btn items-start flex"
      onClick={() => changeFavorite(id)}
    >
      {favorite ? <FaHeart color="red" size={24} /> : <FaRegHeart size={24} />}
    </button>
  );
}
