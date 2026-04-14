// components/ImageThumbnail/ImageThumbnail.tsx
import { useGetImageByIdQuery } from "../../../api/hooks/images/useGetImageByIdQuery";
import "./ImageThumbnail.css";

interface ImageThumbnailProps {
  id: number;
  name: string;
  onClick?: (id: number) => void;
}

export const ImageThumbnail = ({ id, name, onClick }: ImageThumbnailProps) => {
  const { url, isLoading, error } = useGetImageByIdQuery(id);
  const handlerClick = (id: number) => {
    if (onClick) onClick(id);
  };
  if (isLoading) return <div className="user-image loader">Загрузка...</div>;
  if (error || !url) return <div className="user-image error">Ошибка</div>;
  return (
    <img
      className="user-image"
      src={url}
      alt={name}
      onClick={() => handlerClick(id)}
      style={{ cursor: "pointer" }}
    />
  );
};
