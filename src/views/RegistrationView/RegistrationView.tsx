import React, { use, useState } from "react";
import { useCreateUserMutation } from "../../api/hooks/user/useCreateUserMutation";
import axios from "axios";
import "./RegistrationView.css";
import { Link } from "react-router-dom";
import SmartInput from "../../components/GlobalComponents/SmartInput/SmartInput";

function RegistrationView() {
  const createUserMutation = useCreateUserMutation();

  const [newUser, setNewUser] = useState({
    login: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Просто вызываем мутацию, без локального onSuccess
    createUserMutation.mutate(newUser);
  };

  // Функция для получения сообщения об ошибке из ответа сервера
  const getErrorMessage = () => {
    const error = createUserMutation.error;
    if (!error) return null;
    if (axios.isAxiosError(error) && error.response?.data?.error) {
      return error.response.data.error;
    }
    return error.message;
  };

  const errorMessage = getErrorMessage();

  return (
    <main className="login-main">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Регистрация</h2>
        <SmartInput
          type="text"
          placeholder="Логин"
          value={newUser.login}
          onChange={(val) => setNewUser({ ...newUser, login: val })}
          required
        />
        <SmartInput
          type="text"
          placeholder="Имя"
          value={newUser.firstName}
          onChange={(val) => setNewUser({ ...newUser, firstName: val })}
          required
        />
        <SmartInput
          type="text"
          placeholder="Фамилия"
          value={newUser.lastName}
          onChange={(val) => setNewUser({ ...newUser, lastName: val })}
          required
        />
        <SmartInput
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(val) => setNewUser({ ...newUser, email: val })}
          required
        />
        <SmartInput
          type="password"
          placeholder="Пароль"
          value={newUser.password}
          onChange={(val) => setNewUser({ ...newUser, password: val })}
          required
        />
        <SmartInput
          type="password"
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChange={(val) => setConfirmPassword(val)}
          required
          validate={(val) =>
            val !== newUser.password ? "Пароли не совпадают" : null
          }
        />
        <button type="submit" disabled={createUserMutation.isPending}>
          {createUserMutation.isPending ? "Отправка..." : "Отправить"}
        </button>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <Link to="/login">Есть аккаунт</Link>
      </form>
    </main>
  );
}

export default RegistrationView;
