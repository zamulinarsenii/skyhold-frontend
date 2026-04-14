import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FaRegCircleCheck, FaCircleCheck } from "react-icons/fa6";
import { clearSelector } from "../../../store/slices/selectorSlice";
import { AiOutlineClear } from "react-icons/ai";
import { useMoveToBasketMutation } from "../../../api/hooks/basket/useMoveToBasketMutation";
import PopupConfirm from "../PopupConfirm/PopupConfirm";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import "./SelectImages.css";
import { useRemoveImagesFromAlbumMutation } from "../../../api/hooks/albums/useRemoveImagesFromAlbumMutation";

interface Props {
  select: boolean;
  selectAll: boolean;
  toggleSelect: () => void;
  toggleSelectAll: () => void;
  albumId?: number;
  canDelete?: boolean;
}

export default function SelectImages({
  select,
  selectAll,
  toggleSelect,
  toggleSelectAll,
  albumId,
  canDelete = true,
}: Props) {
  const selector = useSelector((state: RootState) => state.selector.selector);
  const dispatch = useDispatch();
  const { mutate: moveToBasket } = useMoveToBasketMutation();
  const { mutate: removeFromAlbum } = useRemoveImagesFromAlbumMutation(
    albumId!,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [message, setMessage] = useState("");

  const getImagesWord = (count: number): string => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return "изображений";
    if (lastDigit === 1) return "изображение";
    if (lastDigit >= 2 && lastDigit <= 4) return "изображения";
    return "изображений";
  };

  useEffect(() => {
    const word = getImagesWord(selector.length);
    if (isOpen) setMessage(`Переместить в корзину ${selector.length} ${word}?`);
    if (isOpen2) setMessage(`Удалить из альбома ${selector.length} ${word}?`);
  }, [selector, isOpen, isOpen2]);

  return (
    <>
      <div className="view-title-actions">
        <button className="shyhold-btn" onClick={toggleSelect}>
          {select ? "Отмена" : "Выбрать"}
        </button>
        {select && (
          <>
            <button
              className="select-all-checkbox border-right-side"
              onClick={toggleSelectAll}
            >
              {selectAll ? (
                <FaCircleCheck size={18} color="var(--accent-blue)" />
              ) : (
                <FaRegCircleCheck size={18} />
              )}
              <span>Все</span>
            </button>
            <div className="border-right-side">Выбрано: {selector.length}</div>
            {canDelete && (
              <button
                className="btn-with-icon border-right-side"
                onClick={() => {
                  if (selector.length > 0) setIsOpen(true);
                }}
              >
                Удалить
                <FaTrashAlt size={16} />
              </button>
            )}

            <button
              className="btn-with-icon border-right-side"
              onClick={() => dispatch(clearSelector())}
            >
              Очистить
              <AiOutlineClear size={20} />
            </button>
            {albumId && (
              <span
                className="font-size-14 border-right-side cursor-pointer"
                onClick={() => {
                  if (selector.length > 0) setIsOpen2(true);
                }}
              >
                Удалить из альбома
              </span>
            )}

            <Link to="/choose-album" className="font-size-14">
              Переместить в альбом
            </Link>
          </>
        )}
      </div>
      <PopupConfirm
        isOpen={isOpen}
        message={message}
        textBtn={"В корзину"}
        onClose={() => setIsOpen(false)}
        doBtn={() => {
          moveToBasket(selector);
          setIsOpen(false);
        }}
      />
      {albumId && (
        <PopupConfirm
          isOpen={isOpen2}
          message={message}
          textBtn={"Удалить из альбома"}
          onClose={() => setIsOpen2(false)}
          doBtn={() => {
            removeFromAlbum({ albumId, imageIds: selector });
            setIsOpen2(false);
          }}
        />
      )}
    </>
  );
}
