import { useGetImageByIdQuery } from "../../../api/hooks/images/useGetImageByIdQuery";

export default function FullscreenImage({
  albumId,
  imageId,
  name,
}: {
  albumId: number;
  imageId: number;
  name: string;
}) {
  const { url, isLoading, error } = useGetImageByIdQuery(imageId);
  if (isLoading) return <div className="slide-loader">Загрузка...</div>;
  if (error || !url) return <div className="slide-error">Ошибка</div>;
  return (
    <div className="slide-image-container flex gap-2">
      <img className="slide-image" src={url} alt={name} />
    </div>
  );
}
