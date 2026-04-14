// components/SmartInput/SmartInput.tsx
import { useState, ChangeEvent, FocusEvent } from "react";
import eye from "../../../assets/icons/eye.svg";
import eyeOff from "../../../assets/icons/eye-off.svg";
import "./SmartInput.css";

interface SmartInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  validate?: (value: string) => string | null;
  name?: string;
  hideHits?: boolean;
}

export default function SmartInput({
  type,
  placeholder,
  value,
  onChange,
  required = false,
  hideHits = false,
  validate,
  name,
}: SmartInputProps) {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const getValidationError = (val: string): string | null => {
    if (hideHits) return "";
    if (required && !val.trim()) {
      return `${placeholder || name || "Поле"} обязательно для заполнения`;
    }
    if (type === "email" && val.trim() && !/^\S+@\S+\.\S+$/.test(val)) {
      return "Введите корректный email";
    }
    if (isPassword && val.trim() && val.length < 8) {
      return "Пароль должен содержать не менее 8 символов";
    }
    if (validate) {
      return validate(val);
    }
    return null;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    if (touched) {
      setError(getValidationError(newValue));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    setError(getValidationError(e.target.value));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="smart-input">
      {name && <span className="smart-input__name">{name}</span>}
      <div className="input-wrapper">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            <img src={showPassword ? eyeOff : eye} alt="Показать пароль" />
          </button>
        )}
      </div>
      {!hideHits && <span className="smart-input__error-message">{error}</span>}
    </div>
  );
}
