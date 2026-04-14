import { useGetImageDetailsQuery } from "../../../api/hooks/images/useGetImageDetailsQuery";
import { IoIosInformationCircleOutline } from "react-icons/io";
import FavoriteBtn from "../ImageBtns/FavoriteBtn";
import DeleteBtn from "../ImageBtns/DeleteBtn";
import "./FullscreenBtns.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export const FullscreenBtns = ({
  id,
  userId,
}: {
  id: number;
  userId: number;
}) => {
  const user = useSelector((state: RootState) => state.user.user);

  const { data: details, isLoading } = useGetImageDetailsQuery(id);

  return (
    <div className="fullscreen-details-container flex gap-2">
      <IoIosInformationCircleOutline className="cursor-pointer" size={24} />
      {!isLoading && (
        <>
          <FavoriteBtn id={id} favorite={details!.favorite}></FavoriteBtn>
          {user && user.id === userId && <DeleteBtn id={id}></DeleteBtn>}
        </>
      )}
    </div>
  );
};
