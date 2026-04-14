import { useGetImageByIdQuery } from "../../../api/hooks/images/useGetImageByIdQuery";

export const FullScreenImage = ({ id, name }: { id: number; name: string }) => {
  const { url, isLoading, error } = useGetImageByIdQuery(id);
  if (isLoading) return <div className="slide-loader">Загрузка...</div>;
  if (error || !url) return <div className="slide-error">Ошибка</div>;
  return (
    <div className="slide-image-container flex gap-2">
      <img className="slide-image" src={url} alt={name} />
    </div>
  );
};
