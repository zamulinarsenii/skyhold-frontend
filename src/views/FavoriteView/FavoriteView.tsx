import ImagesPaginated from "../../components/GlobalComponents/ImagesPaginated/ImagesPaginated";

export default function FavoriteView() {
  return (
    <main>
      <div className="view-title">
        <h1>Ваше избранное</h1>
      </div>
      <ImagesPaginated source={"favorite"}></ImagesPaginated>
    </main>
  );
}
