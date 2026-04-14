import "./PopupConfirm.css";

interface PopupConfirmProps {
  isOpen: boolean;
  message: string;
  textBtn: string;
  onClose: () => void;
  doBtn: () => void;
}

export default function PopupConfirm({
  isOpen,
  message,
  textBtn,
  onClose,
  doBtn,
}: PopupConfirmProps) {

  const handleConfirmClick = () => {
    doBtn();
    onClose();
  };
  
  return (
    <>
      {isOpen && (
        <div className="popup">
          <div className="popup-confirm-container">
            <span>{message}</span>
            <div className="popup-confirm-container__btns">
              <button onClick={() => onClose()}>Отмена</button>
              <button onClick={() => handleConfirmClick()}>{textBtn}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
