// src/views/AlbumView/AlbumView.tsx
import ImagesPaginated from "../../components/GlobalComponents/ImagesPaginated/ImagesPaginated";
import { clearSelector } from "../../store/slices/selectorSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { MdReplay } from "react-icons/md";
import { RootState } from "../../store";
import { useDeleteImagesMutation } from "../../api/hooks/basket/useDeleteImagesMutation";
import { useRestoreImagesMutation } from "../../api/hooks/basket/useRestoreImagesMutation";
import PopupConfirm from "../../components/GlobalComponents/PopupConfirm/PopupConfirm";
import { FaRegCircleCheck, FaCircleCheck } from "react-icons/fa6";

export default function BasketView() {
  const dispatch = useDispatch();
  const [select, setSelect] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const selector = useSelector((state: RootState) => state.selector.selector);
  const { mutate: deleteImages } = useDeleteImagesMutation();
  const { mutate: restoreImages } = useRestoreImagesMutation();
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenRestore, setIsOpenRestore] = useState(false);

  const [msgDelete, setMsgDelete] = useState("");
  const [msgRestore, setMsgRestore] = useState("");

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
    setMsgDelete(`Удалить ${selector.length} ${word}?`);
    setMsgRestore(`Восстановить ${selector.length} ${word}?`);
  }, [selector]);
  return (
    <main>
      <div className="view-title">
        {!select && <h1>Корзина</h1>}
        <button className="shyhold-btn" onClick={() => setSelect(!select)}>
          {select ? "Отмена" : "Выбрать"}
        </button>
        {select && (
          <>
            <button
              className="select-all-checkbox border-right-side"
              onClick={() => setSelectAll(!selectAll)}
            >
              {selectAll ? (
                <FaCircleCheck size={18} color="var(--accent-blue)" />
              ) : (
                <FaRegCircleCheck size={18} />
              )}
              <span>Все</span>
            </button>
            <div className="border-right-side">Выбрано: {selector.length}</div>
            <button
              className="btn-with-icon border-right-side"
              onClick={() => {
                setIsOpenRestore(true);
              }}
            >
              Восстановить
              <MdReplay></MdReplay>
            </button>
            <button
              className="btn-with-icon border-right-side"
              onClick={() => {
                setIsOpenDelete(true);
              }}
            >
              Удалить
              <FaTrashAlt size={16}></FaTrashAlt>
            </button>
            <button
              className="btn-with-icon border-right-side"
              onClick={() => {
                dispatch(clearSelector());
              }}
            >
              Очистить
              <AiOutlineClear size={20}></AiOutlineClear>
            </button>
          </>
        )}
      </div>
      <ImagesPaginated
        source="basket"
        select={select}
        selectAll={selectAll}
      ></ImagesPaginated>
      <PopupConfirm
        isOpen={isOpenDelete}
        message={msgDelete}
        textBtn={"Удалить"}
        onClose={() => setIsOpenDelete(false)}
        doBtn={() => deleteImages(selector)}
      ></PopupConfirm>
      <PopupConfirm
        isOpen={isOpenRestore}
        message={msgRestore}
        textBtn={"Восстановить"}
        onClose={() => setIsOpenRestore(false)}
        doBtn={() => restoreImages(selector)}
      ></PopupConfirm>
    </main>
  );
}
