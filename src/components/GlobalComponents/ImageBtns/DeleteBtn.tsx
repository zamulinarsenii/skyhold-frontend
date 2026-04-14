import { FaTrashAlt } from "react-icons/fa";
import { useMoveToBasketMutation } from "../../../api/hooks/basket/useMoveToBasketMutation";
import PopupConfirm from "../PopupConfirm/PopupConfirm";
import { useState } from "react";

export default function DeleteBtn({ id }: { id: number }) {
  const { mutate: moveToBasket } = useMoveToBasketMutation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className="toggle-favorite-btn items-center flex"
        onClick={() => setIsOpen(true)}
      >
        <FaTrashAlt size={20} />
      </button>
      <PopupConfirm
        isOpen={isOpen}
        message={"Переместить в корзину?"}
        textBtn={"В корзину"}
        onClose={() => setIsOpen(false)}
        doBtn={() => moveToBasket([id])}
      ></PopupConfirm>
    </>
  );
}
